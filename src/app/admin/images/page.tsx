"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import ImageUploader from "@/components/admin/ImageUploader";
import Image from "next/image";

interface StorageFile {
  name: string;
  id: string;
  created_at: string;
  metadata: Record<string, unknown>;
}

interface ImageItem {
  name: string;
  url: string;
  created_at: string;
  size: number;
}

const BUCKET_NAME = "images";
const FOLDERS = ["hero", "boards", "gallery", "blog"];

export default function ImagesPage() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<string>("gallery");
  const [deleting, setDeleting] = useState<string | null>(null);

  const supabase = createClient();

  async function loadImages() {
    setLoading(true);
    setError(null);

    try {
      const { data, error: listError } = await supabase.storage
        .from(BUCKET_NAME)
        .list(selectedFolder, {
          limit: 100,
          sortBy: { column: "created_at", order: "desc" },
        });

      if (listError) throw listError;

      const imageItems: ImageItem[] = (data as StorageFile[])
        .filter((file) => file.name !== ".emptyFolderPlaceholder")
        .map((file) => {
          const { data: { publicUrl } } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(`${selectedFolder}/${file.name}`);

          return {
            name: file.name,
            url: publicUrl,
            created_at: file.created_at,
            size: (file.metadata?.size as number) || 0,
          };
        });

      setImages(imageItems);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load images");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFolder]);

  async function handleDelete(fileName: string) {
    if (!confirm(`Are you sure you want to delete "${fileName}"?`)) return;

    setDeleting(fileName);

    try {
      const { error: deleteError } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([`${selectedFolder}/${fileName}`]);

      if (deleteError) throw deleteError;

      setImages(images.filter((img) => img.name !== fileName));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete image");
    } finally {
      setDeleting(null);
    }
  }

  function formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-ocean-deep">Image Gallery</h1>
      </div>

      {/* Upload Section */}
      <div className="bg-foam-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold text-ocean-deep mb-4">Upload New Image</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-ocean-deep mb-2">
            Upload to folder:
          </label>
          <select
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
            className="px-4 py-2 border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sunset-orange"
          >
            {FOLDERS.map((folder) => (
              <option key={folder} value={folder}>
                {folder.charAt(0).toUpperCase() + folder.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <ImageUploader
          bucket={BUCKET_NAME}
          folder={selectedFolder}
          onUploadComplete={() => loadImages()}
        />
      </div>

      {/* Folder Tabs */}
      <div className="flex gap-2 mb-6">
        {FOLDERS.map((folder) => (
          <button
            key={folder}
            onClick={() => setSelectedFolder(folder)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedFolder === folder
                ? "bg-sunset-orange text-foam-white"
                : "bg-foam-white text-drift-wood hover:bg-sand"
            }`}
          >
            {folder.charAt(0).toUpperCase() + folder.slice(1)}
          </button>
        ))}
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-lg mb-6">
          <p className="font-medium">Error loading images</p>
          <p className="text-sm mt-1">{error}</p>
          <p className="text-sm mt-2">
            Make sure you&apos;ve created the &quot;{BUCKET_NAME}&quot; storage bucket in Supabase.
          </p>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-drift-wood">Loading images...</p>
        </div>
      ) : images.length === 0 ? (
        <div className="bg-foam-white rounded-lg shadow p-8 text-center">
          <p className="text-drift-wood mb-2">No images in this folder yet.</p>
          <p className="text-sm text-drift-wood/70">
            Upload your first image using the form above.
          </p>
        </div>
      ) : (
        /* Image Grid */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image.name}
              className="bg-foam-white rounded-lg shadow overflow-hidden group"
            >
              <div className="relative aspect-square">
                <Image
                  src={image.url}
                  alt={image.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-ocean-deep/0 group-hover:bg-ocean-deep/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigator.clipboard.writeText(image.url)}
                      className="px-3 py-1 bg-foam-white text-ocean-deep text-sm rounded hover:bg-sand transition-colors"
                    >
                      Copy URL
                    </button>
                    <button
                      onClick={() => handleDelete(image.name)}
                      disabled={deleting === image.name}
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors disabled:opacity-50"
                    >
                      {deleting === image.name ? "..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-ocean-deep truncate">
                  {image.name}
                </p>
                <p className="text-xs text-drift-wood">
                  {formatFileSize(image.size)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Setup Instructions */}
      <div className="mt-8 bg-sunset-gold/20 border border-sunset-gold rounded-lg p-6">
        <h3 className="font-bold text-ocean-deep">Supabase Storage Setup</h3>
        <p className="text-drift-wood mt-2 text-sm">
          To use image uploads, create a storage bucket in your Supabase project:
        </p>
        <ol className="list-decimal list-inside text-sm text-drift-wood mt-2 space-y-1">
          <li>Go to Storage in your Supabase dashboard</li>
          <li>Create a new bucket named &quot;{BUCKET_NAME}&quot;</li>
          <li>Set it to Public (for images to be accessible)</li>
          <li>
            Add folders: {FOLDERS.join(", ")}
          </li>
        </ol>
      </div>
    </div>
  );
}
