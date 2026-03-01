import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Handplanes | Sly Mongoose Surf",
  description: "Handcrafted handplanes for bodysurfing.",
};

export default function HandplanesPage() {
  return (
    <div className="bg-sand">
      {/* Hero Section */}
      <section className="bg-ocean-deep text-foam-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Handplanes</h1>
          <p className="text-xl text-ocean-light">
            Bodysurfing essentials
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-foam-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="relative h-80 rounded-lg overflow-hidden mb-8">
              <Image
                src="/images/boards/lena-kestler-1WFSRmQ73nw-unsplash.jpg"
                alt="Handplanes"
                fill
                className="object-cover"
              />
            </div>

            <div className="prose prose-lg text-drift-wood space-y-4">
              <p>
                Bodysurfing is the most direct way to experience a wave. A
                handplane extends your reach and enhances your glide, letting you
                catch more waves and ride them longer.
              </p>
              <p>
                [Describe your handplanes. What shapes and materials? What makes
                them effective? Do you have different models for different
                conditions?]
              </p>
              <p>
                [Talk about bodysurfing culture and why handplanes are such a
                rewarding craft to make.]
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-sand">
              <h3 className="text-xl font-bold text-ocean-deep mb-4">
                Enhance Your Bodysurf
              </h3>
              <p className="text-drift-wood mb-4">
                A good handplane makes all the difference. Let's find the right one
                for you.
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
