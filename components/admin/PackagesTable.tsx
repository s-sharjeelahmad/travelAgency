"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Trash2, Loader2, EyeOff, Eye } from "lucide-react";
import { deletePackageAction, togglePackageStatusAction } from "@/app/actions";
import type { Package } from "@/types/database";

const CATEGORY_LABELS: Record<string, string> = {
  hajj_umrah: "Hajj & Umrah",
  general_travel: "General Travel",
};

interface PackagesTableProps {
  initialPackages: Package[];
}

export default function PackagesTable({ initialPackages }: PackagesTableProps) {
  const router = useRouter();
  const [packages, setPackages] = useState<Package[]>(initialPackages);
  const [toDelete, setToDelete] = useState<Package | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  // Track toggling per-package to avoid blocking the whole table
  const [togglingIds, setTogglingIds] = useState<Set<string>>(new Set());

  function confirmDelete(pkg: Package) {
    setToDelete(pkg);
    setError(null);
  }

  function handleConfirm() {
    if (!toDelete) return;

    startTransition(async () => {
      try {
        await deletePackageAction(toDelete.id, toDelete.image_url);
        setPackages((prev) => prev.filter((p) => p.id !== toDelete.id));
        setToDelete(null);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Deletion failed.");
      }
    });
  }

  async function handleToggle(pkg: Package) {
    setTogglingIds((prev) => new Set(prev).add(pkg.id));
    try {
      await togglePackageStatusAction(pkg.id, pkg.is_active);
      // Optimistically flip the local state
      setPackages((prev) =>
        prev.map((p) =>
          p.id === pkg.id ? { ...p, is_active: !p.is_active } : p
        )
      );
      router.refresh();
    } catch {
      // Silently fall back — router.refresh() will resync from server
      router.refresh();
    } finally {
      setTogglingIds((prev) => {
        const next = new Set(prev);
        next.delete(pkg.id);
        return next;
      });
    }
  }

  if (packages.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-xl">
        <p className="text-slate-400 text-sm">No packages yet. Add one using the sidebar.</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead className="w-16 text-slate-500 font-semibold text-xs uppercase tracking-wide">Thumb</TableHead>
              <TableHead className="text-slate-500 font-semibold text-xs uppercase tracking-wide">Title</TableHead>
              <TableHead className="text-slate-500 font-semibold text-xs uppercase tracking-wide">Category</TableHead>
              <TableHead className="text-slate-500 font-semibold text-xs uppercase tracking-wide">Status</TableHead>
              <TableHead className="text-right text-slate-500 font-semibold text-xs uppercase tracking-wide">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {packages.map((pkg) => (
              <TableRow key={pkg.id} className="hover:bg-slate-50/50">
                {/* Thumbnail */}
                <TableCell>
                  <div className="relative w-10 h-12 rounded-md overflow-hidden bg-slate-100 shrink-0">
                    <Image
                      src={pkg.image_url}
                      alt={pkg.title}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                </TableCell>

                {/* Title */}
                <TableCell className={`font-medium max-w-[220px] truncate ${pkg.is_active ? "text-slate-900" : "text-slate-500"}`}>
                  {pkg.title}
                </TableCell>

                {/* Category badge */}
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                    pkg.is_active 
                      ? "bg-emerald-50 text-emerald-800 border-emerald-200" 
                      : "bg-slate-50 text-slate-600 border-slate-200"
                  }`}>
                    {CATEGORY_LABELS[pkg.category] ?? pkg.category}
                  </span>
                </TableCell>

                {/* Active status */}
                <TableCell>
                  {pkg.is_active ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      Inactive
                    </span>
                  )}
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 gap-1.5 text-xs text-slate-600"
                      onClick={() => handleToggle(pkg)}
                      disabled={togglingIds.has(pkg.id)}
                    >
                      {togglingIds.has(pkg.id) ? (
                        <Loader2 size={13} className="animate-spin" />
                      ) : pkg.is_active ? (
                        <EyeOff size={13} />
                      ) : (
                        <Eye size={13} />
                      )}
                      {pkg.is_active ? "Deactivate" : "Activate"}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="h-8 gap-1.5 text-xs"
                      onClick={() => confirmDelete(pkg)}
                    >
                      <Trash2 size={13} />
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={!!toDelete} onOpenChange={(open) => !open && setToDelete(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-slate-900">Delete Package?</DialogTitle>
            <DialogDescription className="text-slate-500 mt-1">
              This will permanently delete{" "}
              <span className="font-semibold text-slate-700">
                &quot;{toDelete?.title}&quot;
              </span>{" "}
              and remove its brochure image from storage. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              {error}
            </p>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setToDelete(null)}
              disabled={isPending}
              className="text-slate-700"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirm}
              disabled={isPending}
              className="gap-2"
            >
              {isPending ? (
                <><Loader2 size={15} className="animate-spin" /> Deleting…</>
              ) : (
                <><Trash2 size={15} /> Delete Package</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
