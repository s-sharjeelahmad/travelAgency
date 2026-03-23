"use client";

import { useState, useRef, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { UploadCloud, FileImage, CheckCircle, AlertCircle, Loader2, X } from "lucide-react";
import type { PackageCategory } from "@/types/database";
import {
  uploadBrochureImage,
  insertPackage,
} from "@/services/packageService";

type FormStatus = "idle" | "uploading" | "success" | "error";

interface FormState {
  title: string;
  category: PackageCategory;
}

const INITIAL_FORM: FormState = {
  title: "",
  category: "hajj_umrah",
};

const CATEGORY_LABELS: Record<PackageCategory, string> = {
  hajj_umrah: "Hajj & Umrah",
  general_travel: "General Travel",
};

export default function AddPackagePage() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0] ?? null;
    if (!selected) return;

    setFile(selected);
    const objectUrl = URL.createObjectURL(selected);
    setPreview(objectUrl);
  }

  function clearFile() {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function resetForm() {
    setForm(INITIAL_FORM);
    clearFile();
    setStatus("idle");
    setMessage("");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!file) {
      setStatus("error");
      setMessage("Please select a brochure image before submitting.");
      return;
    }

    try {
      setStatus("uploading");
      setMessage("");

      const ext = file.name.split(".").pop() ?? "jpg";
      const uniqueName = `${form.category}/${crypto.randomUUID()}.${ext}`;

      const imageUrl = await uploadBrochureImage(file, uniqueName);

      await insertPackage({
        title: form.title.trim(),
        category: form.category,
        image_url: imageUrl,
      });

      setStatus("success");
      setMessage(`"${form.title}" was uploaded successfully.`);
      resetForm();
    } catch (err) {
      const errMsg =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setStatus("error");
      setMessage(errMsg);
    }
  }

  const isLoading = status === "uploading";

  return (
    <div className="max-w-3xl space-y-8">
      {/* Page header (Dark text for light background layout) */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Add Package</h1>
        <p className="text-slate-500 text-sm mt-2">
          Upload a high-quality brochure and fill in the package details to list it online.
        </p>
      </div>

      {/* Premium White Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <form onSubmit={handleSubmit} noValidate className="p-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Title Input */}
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-slate-700"
              >
                Package Title
                <span className="text-amber-600 ml-1">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                disabled={isLoading}
                value={form.title}
                onChange={handleInputChange}
                placeholder="e.g. 7-Day Luxury Umrah"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 text-sm placeholder-slate-400 outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all disabled:opacity-50 disabled:bg-slate-100"
              />
            </div>

            {/* Category Select */}
            <div className="space-y-2">
              <label
                htmlFor="category"
                className="block text-sm font-semibold text-slate-700"
              >
                Category
                <span className="text-amber-600 ml-1">*</span>
              </label>
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  required
                  disabled={isLoading}
                  value={form.category}
                  onChange={handleInputChange}
                  className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 text-sm outline-none focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all disabled:opacity-50 disabled:bg-slate-100"
                >
                  {(Object.keys(CATEGORY_LABELS) as PackageCategory[]).map(
                    (key) => (
                      <option key={key} value={key}>
                        {CATEGORY_LABELS[key]}
                      </option>
                    )
                  )}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Image Upload Zone */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Brochure Image
              <span className="text-amber-600 ml-1">*</span>
            </label>

            {preview ? (
              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50 group">
                <div className="relative w-full h-[400px]">
                  <Image
                    src={preview}
                    alt="Brochure preview"
                    fill
                    className="object-contain py-4"
                  />
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    type="button"
                    onClick={clearFile}
                    disabled={isLoading}
                    className="w-8 h-8 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-500 hover:text-red-500 hover:border-red-200 transition-all"
                    aria-label="Remove image"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="px-4 py-3 bg-white border-t border-slate-200 flex items-center gap-2">
                  <FileImage size={16} className="text-slate-400 shrink-0" />
                  <span className="text-slate-600 text-sm font-medium truncate">{file?.name}</span>
                  <span className="text-slate-400 text-xs ml-auto shrink-0 font-medium bg-slate-100 px-2 py-1 rounded-md">
                    {file ? (file.size / 1024).toFixed(0) + " KB" : ""}
                  </span>
                </div>
              </div>
            ) : (
              <button
                type="button"
                disabled={isLoading}
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-slate-300 rounded-xl py-12 flex flex-col items-center justify-center gap-4 bg-slate-50 hover:bg-amber-50/50 hover:border-amber-400 transition-all group disabled:opacity-50 disabled:cursor-not-allowed outline-none focus-visible:ring-4 focus-visible:ring-amber-500/20 focus-visible:border-amber-500"
              >
                <div className="w-14 h-14 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center group-hover:scale-110 group-hover:border-amber-200 group-hover:text-amber-600 transition-all duration-300">
                  <UploadCloud size={24} className="text-slate-400 group-hover:text-amber-500 transition-colors" />
                </div>
                <div className="text-center">
                  <p className="text-slate-700 text-sm font-medium group-hover:text-slate-900 transition-colors">
                    Click to upload brochure
                  </p>
                  <p className="text-slate-500 text-xs mt-1">(JPG, PNG, WebP)</p>
                </div>
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="hidden"
              aria-label="Upload brochure image"
            />
          </div>

          {/* Feedback Banner */}
          {(status === "success" || status === "error") && message && (
            <div
              role="alert"
              className={`flex items-start gap-3 rounded-lg px-4 py-4 text-sm font-medium border ${
                status === "success"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                  : "bg-red-50 border-red-200 text-red-800"
              }`}
            >
              {status === "success" ? (
                <CheckCircle size={18} className="shrink-0 text-emerald-500" />
              ) : (
                <AlertCircle size={18} className="shrink-0 text-red-500" />
              )}
              <span>{message}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-lg shadow-sm hover:shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed outline-none focus-visible:ring-4 focus-visible:ring-amber-600/30"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Uploading…
                </>
              ) : (
                <>
                  <UploadCloud size={18} />
                  List Package
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
