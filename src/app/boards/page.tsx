import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What We Build | Sly Mongoose Surf",
  description: "Explore our handcrafted surfboards, alaias, paipos, and handplanes.",
};

const boards = [
  {
    title: "Traditional Surfboards",
    description:
      "Classic shapes designed for performance and style. From longboards to shortboards, each one shaped by hand.",
    href: "/boards/traditional",
    image: "/images/boards/trent-bradley-GIfK6UZA1kY-unsplash.jpg",
  },
  {
    title: "Alaias",
    description:
      "Ancient Hawaiian finless surfboards. Pure glide, pure connection with the wave. A return to the roots of surfing.",
    href: "/boards/alaias",
    image: "/images/boards/igor-starkov-f4mLA8nDbRg-unsplash.jpg",
  },
  {
    title: "Paipos",
    description:
      "Traditional Hawaiian belly boards. Experience waves from a different perspective—close to the water, fast and nimble.",
    href: "/boards/paipos",
    image: "/images/boards/sten-rademaker-1kXi2x9t9Fg-unsplash.jpg",
  },
  {
    title: "Handplanes",
    description:
      "For the bodysurfer. These compact craft extend your reach and enhance your glide in the water.",
    href: "/boards/handplanes",
    image: "/images/boards/lena-kestler-1WFSRmQ73nw-unsplash.jpg",
  },
];

export default function BoardsPage() {
  return (
    <div className="bg-sand">
      {/* Hero Section */}
      <section className="bg-ocean-deep text-foam-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">What We Build</h1>
          <p className="text-xl text-ocean-light">
            From traditional surfboards to ancient Hawaiian craft, each piece is
            shaped by hand with intention and care.
          </p>
        </div>
      </section>

      {/* Boards Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {boards.map((board) => (
              <Link
                key={board.href}
                href={board.href}
                className="group bg-foam-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative h-64">
                  <Image
                    src={board.image}
                    alt={board.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-ocean-deep group-hover:text-sunset-orange transition-colors mb-2">
                    {board.title}
                  </h2>
                  <p className="text-drift-wood">{board.description}</p>
                  <span className="inline-block mt-4 text-sunset-orange font-semibold group-hover:underline">
                    Learn More →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Order CTA */}
      <section className="py-16 md:py-24 bg-sunset-orange text-foam-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Custom Orders</h2>
          <p className="text-xl mb-8 opacity-90">
            Have something specific in mind? We love working with surfers to
            create custom boards tailored to their style and local waves.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-foam-white text-sunset-orange hover:bg-sand font-semibold px-8 py-3 rounded-lg transition-colors text-lg"
          >
            Start a Conversation
          </Link>
        </div>
      </section>
    </div>
  );
}
