"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

interface ImageUploaderProps {
  bucket: string;
  folder?: string;
  onUploadComplete?: (url: string) => void;
}

export default function ImageUploader({
  bucket,
  folder = "",
  onUploadComplete,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a valid image file (JPG, PNG, WebP, or GIF)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    setError(null);
    setUploading(true);
    setUploadedUrl(null);

    try {
      // Generate unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = folder ? `${folder}/${fileName}` : fileName;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      setUploadedUrl(publicUrl);
      onUploadComplete?.(publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
      setPreview(null);
    } finally {
      setUploading(false);
    }
  }

  function handleReset() {
    setPreview(null);
    setUploadedUrl(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {!preview ? (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-sand rounded-lg cursor-pointer hover:bg-sand/50 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-10 h-10 mb-3 text-drift-wood"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="mb-2 text-sm text-drift-wood">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-drift-wood/70">
              PNG, JPG, WebP or GIF (max 5MB)
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      ) : (
        <div className="relative">
          <div className="relative h-48 w-full rounded-lg overflow-hidden bg-sand">
            <Image
              src={preview}
              alt="Upload preview"
              fill
              className="object-contain"
            />
          </div>

          {uploading && (
            <div className="absolute inset-0 bg-ocean-deep/50 rounded-lg flex items-center justify-center">
              <div className="text-foam-white font-medium">Uploading...</div>
            </div>
          )}

          {uploadedUrl && (
            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 text-sm font-medium mb-2">
                Upload successful!
              </p>
              <input
                type="text"
                value={uploadedUrl}
                readOnly
                className="w-full px-3 py-2 text-xs bg-white border border-green-200 rounded focus:outline-none"
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />
            </div>
          )}

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 text-sm border border-drift-wood text-drift-wood hover:bg-drift-wood hover:text-foam-white rounded-lg transition-colors"
            >
              Upload Another
            </button>
            {uploadedUrl && (
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(uploadedUrl)}
                className="px-4 py-2 text-sm bg-ocean-deep text-foam-white hover:bg-ocean-light rounded-lg transition-colors"
              >
                Copy URL
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
