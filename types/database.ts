// TypeScript interfaces generated from the Supabase schema.
// SQL Source:
//   CREATE TYPE package_category AS ENUM ('hajj_umrah', 'general_travel');
//   CREATE TABLE packages (
//     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
//     category package_category NOT NULL DEFAULT 'hajj_umrah',
//     title TEXT NOT NULL,
//     image_url TEXT NOT NULL,
//     is_active BOOLEAN DEFAULT true,
//     created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
//   );

export type PackageCategory = "hajj_umrah" | "general_travel";

/** Represents a full row from the `packages` table. */
export interface Package {
  id: string;
  category: PackageCategory;
  title: string;
  image_url: string;
  is_active: boolean;
  created_at: string;
}

/** Payload for inserting a new package row.
 *  Omits server-generated fields: id, created_at.
 *  is_active defaults to true on the DB side but can be overridden here. */
export interface PackageInsert {
  category: PackageCategory;
  title: string;
  image_url: string;
  is_active?: boolean;
}

// ---------------------------------------------------------------------------
// Supabase generic Database type
// Used to type the Supabase client so all queries are fully type-safe.
// ---------------------------------------------------------------------------

export type Database = {
  public: {
    Tables: {
      packages: {
        Row: Package;
        Insert: PackageInsert;
        Update: Partial<PackageInsert>;
      };
    };
    Enums: {
      package_category: PackageCategory;
    };
  };
};
