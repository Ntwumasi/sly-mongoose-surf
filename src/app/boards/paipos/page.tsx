import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Paipos | Sly Mongoose Surf",
  description: "Handcrafted paipos - traditional Hawaiian belly boards.",
};

export default function PaiposPage() {
  return (
    <div className="bg-sand">
      {/* Hero Section */}
      <section className="bg-ocean-deep text-foam-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Paipos</h1>
          <p className="text-xl text-ocean-light">
            Traditional Hawaiian belly boards
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-foam-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="relative h-80 rounded-lg overflow-hidden mb-8">
              <Image
                src="/images/boards/sten-rademaker-1kXi2x9t9Fg-unsplash.jpg"
                alt="Paipos"
                fill
                className="object-cover"
              />
            </div>

            <div className="prose prose-lg text-drift-wood space-y-4">
              <p>
                Paipos offer a completely different wave-riding experience. Lying
                prone on these small boards, you're close to the water, fast, and
                able to ride waves that stand-up surfboards can't handle.
              </p>
              <p>
                [Describe your paipos. What shapes and sizes? What materials? What
                kind of waves are they best suited for?]
              </p>
              <p>
                [Share why you make paipos and what makes them special. The history,
                the feeling of riding one, the community around them.]
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-sand">
              <h3 className="text-xl font-bold text-ocean-deep mb-4">
                Get Close to the Water
              </h3>
              <p className="text-drift-wood mb-4">
                A paipo might just change the way you think about surfing. Reach out
                to learn more.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-sunset-orange hover:bg-sunset-gold text-foam-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
