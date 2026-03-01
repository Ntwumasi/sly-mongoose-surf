import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Traditional Surfboards | Sly Mongoose Surf",
  description: "Handcrafted traditional surfboards for all conditions.",
};

export default function TraditionalPage() {
  return (
    <div className="bg-sand">
      {/* Hero Section */}
      <section className="bg-ocean-deep text-foam-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Traditional Surfboards</h1>
          <p className="text-xl text-ocean-light">
            Classic shapes designed for performance and style
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-foam-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="relative h-80 rounded-lg overflow-hidden mb-8">
              <Image
                src="/images/boards/trent-bradley-GIfK6UZA1kY-unsplash.jpg"
                alt="Traditional Surfboards"
                fill
                className="object-cover"
              />
            </div>

            <div className="prose prose-lg text-drift-wood space-y-4">
              <p>
                [Describe your traditional surfboard offerings. What shapes do you
                make? Longboards, midlengths, shortboards? What makes your approach
                unique?]
              </p>
              <p>
                [Talk about materials, construction methods, and design philosophy.
                What kind of rider and waves are these boards suited for?]
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-sand">
              <h3 className="text-xl font-bold text-ocean-deep mb-4">
                Interested in a Custom Board?
              </h3>
              <p className="text-drift-wood mb-4">
                Every surfer is different, and so are the waves they ride. Let's
                talk about what would work best for you.
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
