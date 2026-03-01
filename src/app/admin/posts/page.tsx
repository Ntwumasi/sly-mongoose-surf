import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  created_at: string;
}

export default async function PostsPage() {
  const supabase = await createClient();

  let posts: Post[] = [];
  let error: string | null = null;

  try {
    const { data, error: fetchError } = await supabase
      .from("posts")
      .select("id, title, slug, published, created_at")
      .order("created_at", { ascending: false });

    if (fetchError) throw fetchError;
    posts = data || [];
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load posts";
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-ocean-deep">Blog Posts</h1>
        <Link
          href="/admin/posts/new"
          className="bg-sunset-orange hover:bg-sunset-gold text-foam-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          + New Post
        </Link>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-lg">
          <p className="font-medium">Error loading posts</p>
          <p className="text-sm mt-1">{error}</p>
          <p className="text-sm mt-2">
            Make sure you&apos;ve created the &quot;posts&quot; table in Supabase.
          </p>
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-foam-white rounded-lg shadow p-8 text-center">
          <p className="text-drift-wood mb-4">No posts yet.</p>
          <Link
            href="/admin/posts/new"
            className="text-sunset-orange hover:underline font-medium"
          >
            Create your first post →
          </Link>
        </div>
      ) : (
        <div className="bg-foam-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-sand">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-ocean-deep">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-ocean-deep">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-ocean-deep">
                  Created
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-ocean-deep">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-sand/50">
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/posts/${post.id}`}
                      className="font-medium text-ocean-deep hover:text-sunset-orange"
                    >
                      {post.title}
                    </Link>
                    <p className="text-sm text-drift-wood">/{post.slug}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        post.published
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-drift-wood">
                    {new Date(post.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/posts/${post.id}`}
                      className="text-sunset-orange hover:underline text-sm font-medium"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
