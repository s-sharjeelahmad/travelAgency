"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

const BROCHURES_BUCKET = "package-brochures";

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
  const { error: dbError } = await supabase
    .from("packages")
    .delete()
    .eq("id", id);

  if (dbError) {
    throw new Error(`Delete failed: ${dbError.message}`);
  }

  // 2. Best-effort purge from Storage
  if (storagePath) {
    await supabase.storage
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
  const { error } = await supabase
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
