import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Get user info
  const { data: { user } } = await supabase.auth.getUser();

  // Try to get post count (will fail gracefully if table doesn't exist yet)
  let postCount = 0;
  let publishedCount = 0;

  try {
    const { count } = await supabase
      .from("posts")
      .select("*", { count: "exact", head: true });
    postCount = count || 0;

    const { count: published } = await supabase
      .from("posts")
      .select("*", { count: "exact", head: true })
      .eq("published", true);
    publishedCount = published || 0;
  } catch {
    // Table might not exist yet
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-ocean-deep">Dashboard</h1>
        <p className="text-drift-wood mt-1">
          Welcome back, {user?.email}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-foam-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-drift-wood">Total Posts</h3>
          <p className="text-3xl font-bold text-ocean-deep mt-2">{postCount}</p>
        </div>
        <div className="bg-foam-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-drift-wood">Published</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{publishedCount}</p>
        </div>
        <div className="bg-foam-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-drift-wood">Drafts</h3>
          <p className="text-3xl font-bold text-sunset-orange mt-2">
            {postCount - publishedCount}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-foam-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-ocean-deep mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/admin/posts/new"
            className="bg-sunset-orange hover:bg-sunset-gold text-foam-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            + New Blog Post
          </Link>
          <Link
            href="/admin/images"
            className="bg-ocean-deep hover:bg-ocean-light text-foam-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Manage Images
          </Link>
          <Link
            href="/admin/posts"
            className="border-2 border-ocean-deep text-ocean-deep hover:bg-ocean-deep hover:text-foam-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            View All Posts
          </Link>
        </div>
      </div>

      {/* Setup Notice */}
      {postCount === 0 && (
        <div className="mt-8 bg-sunset-gold/20 border border-sunset-gold rounded-lg p-6">
          <h3 className="font-bold text-ocean-deep">Getting Started</h3>
          <p className="text-drift-wood mt-2">
            Your admin panel is ready! Make sure you&apos;ve set up your Supabase
            database tables. Check the setup instructions in the CLAUDE.md file.
          </p>
        </div>
      )}
    </div>
  );
}
