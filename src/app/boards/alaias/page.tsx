import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Alaias | Sly Mongoose Surf",
  description: "Handcrafted alaias - finless wooden surfboards in the ancient Hawaiian tradition.",
};

export default function AlaiasPage() {
  return (
    <div className="bg-sand">
      {/* Hero Section */}
      <section className="bg-ocean-deep text-foam-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Alaias</h1>
          <p className="text-xl text-ocean-light">
            Ancient Hawaiian finless surf craft
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-foam-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="relative h-80 rounded-lg overflow-hidden mb-8">
              <Image
                src="/images/boards/igor-starkov-f4mLA8nDbRg-unsplash.jpg"
                alt="Alaias"
                fill
                className="object-cover"
              />
            </div>

            <div className="prose prose-lg text-drift-wood space-y-4">
              <p>
                The alaia is the original surfboard—a thin, finless wooden craft
                ridden by ancient Hawaiians. Riding one is a return to the pure
                essence of wave riding.
              </p>
              <p>
                [Describe your alaias. What woods do you use? What lengths and
                shapes? What's the experience of riding one like?]
              </p>
              <p>
                [Talk about the history and cultural significance. Why do you
                make alaias? What draws you to this traditional craft?]
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-sand">
              <h3 className="text-xl font-bold text-ocean-deep mb-4">
                Ready to Go Finless?
              </h3>
              <p className="text-drift-wood mb-4">
                Riding an alaia is a unique experience. Let's find the right board
                for your journey.
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
