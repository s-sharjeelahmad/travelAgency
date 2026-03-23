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


