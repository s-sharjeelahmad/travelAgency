import { supabase } from "@/lib/supabase";
import type { Package, PackageCategory, PackageInsert } from "@/types/database";

const BROCHURES_BUCKET = "package-brochures";

// ---------------------------------------------------------------------------
// READ
// ---------------------------------------------------------------------------

/**
 * Fetch all active packages, optionally filtered by category.
 *
 * @param category - Optional filter: 'hajj_umrah' | 'general_travel'
 * @returns An array of Package rows ordered by creation date (newest first).
 */
export async function fetchActivePackages(
  category?: PackageCategory
): Promise<Package[]> {
  let query = supabase
    .from("packages")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`fetchActivePackages failed: ${error.message}`);
  }

  return data ?? [];
}

// ---------------------------------------------------------------------------
// WRITE
// ---------------------------------------------------------------------------

/**
 * Insert a new package record into the database.
 *
 * @param payload - The package data to insert (excludes id and created_at).
 * @returns The newly created Package row.
 */
export async function insertPackage(payload: PackageInsert): Promise<Package> {
  const { data, error } = await supabase
    .from("packages")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .insert(payload as any)
    .select()
    .single();

  if (error) {
    throw new Error(`insertPackage failed: ${error.message}`);
  }

  return data;
}

// ---------------------------------------------------------------------------
// STORAGE
// ---------------------------------------------------------------------------

/**
 * Upload a brochure image to the `package-brochures` storage bucket.
 *
 * @param file     - The File/Blob to upload (expected to be a JPG).
 * @param fileName - The storage path/filename (e.g. "hajj/package-123.jpg").
 * @returns The public URL of the uploaded image.
 */
export async function uploadBrochureImage(
  file: File,
  fileName: string
): Promise<string> {
  const { error: uploadError } = await supabase.storage
    .from(BROCHURES_BUCKET)
    .upload(fileName, file, {
      contentType: "image/jpeg",
      upsert: true,
    });

  if (uploadError) {
    throw new Error(`uploadBrochureImage failed: ${uploadError.message}`);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(BROCHURES_BUCKET).getPublicUrl(fileName);

  return publicUrl;
}

// ---------------------------------------------------------------------------
// ADMIN READS
// ---------------------------------------------------------------------------

/**
 * Fetch ALL packages (active and inactive) for the admin dashboard.
 */
export async function fetchAllPackages(): Promise<Package[]> {
  const { data, error } = await supabase
    .from("packages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`fetchAllPackages failed: ${error.message}`);
  }

  return data ?? [];
}

// ---------------------------------------------------------------------------
// DELETE
// ---------------------------------------------------------------------------

/**
 * Delete a package entirely: removes the DB row AND purges the image from
 * Supabase Storage so we don't accumulate orphaned files.
 *
 * @param id       - UUID of the package row.
 * @param imageUrl - Public URL of the uploaded brochure image.
 */
export async function deletePackage(
  id: string,
  imageUrl: string
): Promise<void> {
  // Derive the storage path from the public URL.
  // Public URLs look like: .../storage/v1/object/public/package-brochures/<path>
  const marker = `/object/public/${BROCHURES_BUCKET}/`;
  const storagePath = imageUrl.includes(marker)
    ? imageUrl.split(marker)[1]
    : null;

  // 1. Delete DB row first (most important — prevents broken UI state)
  const { error: dbError } = await supabase
    .from("packages")
    .delete()
    .eq("id", id);

  if (dbError) {
    throw new Error(`deletePackage (db) failed: ${dbError.message}`);
  }

  // 2. Delete storage file (best-effort — log but don't throw if it fails)
  if (storagePath) {
    const { error: storageError } = await supabase.storage
      .from(BROCHURES_BUCKET)
      .remove([decodeURIComponent(storagePath)]);

    if (storageError) {
      console.warn(`deletePackage (storage) warning: ${storageError.message}`);
    }
  }
}

