import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPostSlugs } from "@/lib/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} | Sly Mongoose Surf`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-sand min-h-screen">
      {/* Hero Section */}
      <section className="bg-ocean-deep text-foam-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/blog"
            className="text-ocean-light hover:text-foam-white transition-colors mb-4 inline-block"
          >
            ← Back to Blog
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          <time className="text-ocean-light">{post.date}</time>
          {post.author && (
            <p className="text-ocean-light mt-2">by {post.author}</p>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="bg-foam-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="prose prose-lg max-w-none prose-headings:text-ocean-deep prose-p:text-drift-wood prose-a:text-sunset-orange prose-strong:text-ocean-deep">
              {/* Render MDX content */}
              <div dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />
            </div>
          </article>

          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="inline-block bg-ocean-deep hover:bg-ocean-light text-foam-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Simple markdown renderer (basic implementation)
function renderMarkdown(content: string): string {
  return content
    .split("\n\n")
    .map((paragraph) => {
      // Handle headings
      if (paragraph.startsWith("# ")) {
        return `<h1>${paragraph.slice(2)}</h1>`;
      }
      if (paragraph.startsWith("## ")) {
        return `<h2>${paragraph.slice(3)}</h2>`;
      }
      if (paragraph.startsWith("### ")) {
        return `<h3>${paragraph.slice(4)}</h3>`;
      }
      // Handle bold and italic
      let text = paragraph
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>");
      return `<p>${text}</p>`;
    })
    .join("\n");
}
