"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import type { PackageCategory } from "@/types/database";

const BROCHURES_BUCKET = "package-brochures";

/**
 * Server Action: Completely handles the upload and insertion of a new package.
 * Bypasses RLS by using supabaseAdmin.
 */
export async function createPackageAction(formData: FormData): Promise<void> {
  const title = formData.get("title") as string;
  const category = formData.get("category") as PackageCategory;
  const file = formData.get("file") as File;

  if (!title || !category || !file) {
    throw new Error("Missing required fields for package creation.");
  }

  const ext = file.name.split(".").pop() ?? "jpg";
  const uniqueName = `${category}/${crypto.randomUUID()}.${ext}`;

  // 1. Upload the image using the Admin client
  const { error: uploadError } = await supabaseAdmin.storage
    .from(BROCHURES_BUCKET)
    .upload(uniqueName, file, {
      contentType: file.type || "image/jpeg",
      upsert: true,
    });

  if (uploadError) {
    throw new Error(`Brochure upload failed: ${uploadError.message}`);
  }

  // 2. Get the public URL
  const {
    data: { publicUrl },
  } = supabaseAdmin.storage.from(BROCHURES_BUCKET).getPublicUrl(uniqueName);

  // 3. Insert the database record using the Admin client
  const { error: dbError } = await supabaseAdmin
    .from("packages")
    // @ts-ignore - Supabase type inference bug with never
    .insert({ title, category, image_url: publicUrl });

  if (dbError) {
    // Attempt rollback of the image if DB fails
    await supabaseAdmin.storage.from(BROCHURES_BUCKET).remove([uniqueName]);
    throw new Error(`Database insert failed: ${dbError.message}`);
  }

  revalidatePath("/");
  revalidatePath("/admin");
}

/**
 * Server Action: Delete a package row from the DB and its image from Storage.
 * Calls revalidatePath after deletion so Next.js rebuilds cached HTML immediately
 * — this is the correct fix for ghost packages showing after deletion.
 */
export async function deletePackageAction(
  id: string,
  imageUrl: string
): Promise<void> {
  // Derive storage path from the public URL
  const marker = `/object/public/${BROCHURES_BUCKET}/`;
  const storagePath = imageUrl.includes(marker)
    ? imageUrl.split(marker)[1]
    : null;

  // 1. Delete DB row first
  const { error: dbError } = await supabaseAdmin
    .from("packages")
    .delete()
    .eq("id", id);

  if (dbError) {
    throw new Error(`Delete failed: ${dbError.message}`);
  }

  // 2. Best-effort purge from Storage
  if (storagePath) {
    await supabaseAdmin.storage
      .from(BROCHURES_BUCKET)
      .remove([decodeURIComponent(storagePath)]);
  }

  // 3. CRITICAL: Nuke the Next.js full-route cache for both pages
  revalidatePath("/");
  revalidatePath("/admin");
}

/**
 * Server Action: Toggle the is_active status of a package.
 * Flips the boolean and immediately revalidates cached pages.
 */
export async function togglePackageStatusAction(
  id: string,
  currentStatus: boolean
): Promise<void> {
  const { error } = await supabaseAdmin
    .from("packages")
    // @ts-ignore - Supabase type inference has narrowed this to never
    .update({ is_active: !currentStatus })
    .eq("id", id);

  if (error) {
    throw new Error(`togglePackageStatus failed: ${error.message}`);
  }

  revalidatePath("/");
  revalidatePath("/admin");
}
