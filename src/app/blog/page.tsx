import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Sly Mongoose Surf",
  description: "Stories, insights, and updates from the shaping bay.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="bg-sand min-h-screen">
      {/* Hero Section */}
      <section className="bg-ocean-deep text-foam-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Blog</h1>
          <p className="text-xl text-ocean-light">
            Stories, insights, and updates from the shaping bay
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="bg-foam-white rounded-lg shadow-lg p-8 md:p-12 text-center">
              <h2 className="text-2xl font-bold text-ocean-deep mb-4">
                Coming Soon
              </h2>
              <p className="text-drift-wood">
                We're working on some stories to share. Check back soon!
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-foam-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <Link href={`/blog/${post.slug}`} className="block p-8">
                    <time className="text-sm text-ocean-light">{post.date}</time>
                    <h2 className="text-2xl font-bold text-ocean-deep mt-2 hover:text-sunset-orange transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-drift-wood mt-3">{post.excerpt}</p>
                    )}
                    <span className="inline-block mt-4 text-sunset-orange font-semibold">
                      Read more →
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
