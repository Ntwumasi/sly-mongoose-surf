"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("Sly Mongoose");
  const [published, setPublished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const supabase = createClient();

  // Auto-generate slug from title
  function handleTitleChange(value: string) {
    setTitle(value);
    const newSlug = value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    setSlug(newSlug);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const { error: insertError } = await supabase.from("posts").insert({
      title,
      slug,
      excerpt,
      content,
      author,
      published,
    });

    if (insertError) {
      setError(insertError.message);
      setSaving(false);
    } else {
      router.push("/admin/posts");
      router.refresh();
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-ocean-deep">New Post</h1>
        <Link
          href="/admin/posts"
          className="text-drift-wood hover:text-ocean-deep transition-colors"
        >
          ← Back to Posts
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="bg-foam-white rounded-lg shadow p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-ocean-deep mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
              className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sunset-orange"
              placeholder="Post title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ocean-deep mb-1">
              Slug
            </label>
            <div className="flex items-center">
              <span className="text-drift-wood mr-2">/blog/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                className="flex-1 px-4 py-3 border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sunset-orange"
                placeholder="post-slug"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ocean-deep mb-1">
              Excerpt
            </label>
            <input
              type="text"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sunset-orange"
              placeholder="Brief description for listings"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ocean-deep mb-1">
              Author
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sunset-orange"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ocean-deep mb-1">
              Content (Markdown)
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={15}
              className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sunset-orange font-mono text-sm"
              placeholder="Write your post content in Markdown..."
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="w-4 h-4 text-sunset-orange rounded focus:ring-sunset-orange"
            />
            <label htmlFor="published" className="text-sm text-ocean-deep">
              Publish immediately
            </label>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-sunset-orange hover:bg-sunset-gold text-foam-white font-semibold px-8 py-3 rounded-lg transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Create Post"}
          </button>
          <Link
            href="/admin/posts"
            className="border-2 border-drift-wood text-drift-wood hover:bg-drift-wood hover:text-foam-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
