"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  published: boolean;
}

export default function EditPostPage() {
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const params = useParams();
  const supabase = createClient();
  const postId = params.id as string;

  useEffect(() => {
    async function loadPost() {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", postId)
        .single();

      if (error) {
        setError("Post not found");
      } else if (data) {
        setPost(data);
        setTitle(data.title);
        setSlug(data.slug);
        setExcerpt(data.excerpt || "");
        setContent(data.content || "");
        setAuthor(data.author || "");
        setPublished(data.published);
      }
      setLoading(false);
    }

    loadPost();
  }, [postId, supabase]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const { error: updateError } = await supabase
      .from("posts")
      .update({
        title,
        slug,
        excerpt,
        content,
        author,
        published,
        updated_at: new Date().toISOString(),
      })
      .eq("id", postId);

    if (updateError) {
      setError(updateError.message);
      setSaving(false);
    } else {
      router.push("/admin/posts");
      router.refresh();
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this post?")) return;

    setDeleting(true);
    const { error: deleteError } = await supabase
      .from("posts")
      .delete()
      .eq("id", postId);

    if (deleteError) {
      setError(deleteError.message);
      setDeleting(false);
    } else {
      router.push("/admin/posts");
      router.refresh();
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-drift-wood">Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-lg">
        <p>Post not found</p>
        <Link href="/admin/posts" className="underline mt-2 inline-block">
          Back to Posts
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-ocean-deep">Edit Post</h1>
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
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-sunset-orange"
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
              Published
            </label>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-sunset-orange hover:bg-sunset-gold text-foam-white font-semibold px-8 py-3 rounded-lg transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <Link
              href="/admin/posts"
              className="border-2 border-drift-wood text-drift-wood hover:bg-drift-wood hover:text-foam-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Cancel
            </Link>
          </div>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </form>
    </div>
  );
}
