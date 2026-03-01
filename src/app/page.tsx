import Image from "next/image";
import Link from "next/link";

const boardTypes = [
  {
    title: "Traditional Surfboards",
    description: "Classic shapes for all conditions",
    href: "/boards/traditional",
    image: "/images/boards/trent-bradley-GIfK6UZA1kY-unsplash.jpg",
  },
  {
    title: "Alaias",
    description: "Finless wooden surf craft",
    href: "/boards/alaias",
    image: "/images/boards/igor-starkov-f4mLA8nDbRg-unsplash.jpg",
  },
  {
    title: "Paipos",
    description: "Belly boards for pure wave riding",
    href: "/boards/paipos",
    image: "/images/boards/sten-rademaker-1kXi2x9t9Fg-unsplash.jpg",
  },
  {
    title: "Handplanes",
    description: "Bodysurfing essentials",
    href: "/boards/handplanes",
    image: "/images/boards/lena-kestler-1WFSRmQ73nw-unsplash.jpg",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-ocean-deep text-foam-white min-h-[70vh] flex items-center">
        <Image
          src="/images/hero/hero.jpg"
          alt="Sly Mongoose Surf"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-ocean-deep/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-sunset-gold">Handcrafted</span>
              <br />
              Surfboards
            </h1>
            <p className="text-xl md:text-2xl text-foam-white/90 max-w-2xl mx-auto mb-8">
              Traditional surfboards, alaias, paipos, and handplanes—each one
              shaped by hand with respect for the craft and love for the ocean.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/boards"
                className="bg-sunset-orange hover:bg-sunset-gold text-foam-white font-semibold px-8 py-3 rounded-lg transition-colors text-lg"
              >
                See Our Work
              </Link>
              <Link
                href="/contact"
                className="border-2 border-foam-white hover:bg-foam-white hover:text-ocean-deep font-semibold px-8 py-3 rounded-lg transition-colors text-lg"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What We Build Section */}
      <section className="py-16 md:py-24 bg-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-ocean-deep mb-12">
            What We Build
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {boardTypes.map((board) => (
              <Link
                key={board.href}
                href={board.href}
                className="group bg-foam-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow border-2 border-transparent hover:border-sunset-orange"
              >
                <div className="relative h-48">
                  <Image
                    src={board.image}
                    alt={board.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-ocean-deep group-hover:text-sunset-orange transition-colors">
                    {board.title}
                  </h3>
                  <p className="text-drift-wood mt-2">{board.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-16 md:py-24 bg-foam-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 rounded-lg overflow-hidden">
              <Image
                src="/images/boards/bruno-cervera-4rvc6HWITpY-unsplash.jpg"
                alt="Craftsmanship"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-ocean-deep mb-6">
                The Craft
              </h2>
              <p className="text-lg text-drift-wood mb-6">
                Every board that leaves our shop carries the spirit of traditional
                surfboard craftsmanship. From selecting the right materials to the
                final hand-sanding, each step is done with intention and care.
              </p>
              <Link
                href="/about"
                className="inline-block bg-ocean-deep hover:bg-ocean-light text-foam-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-sunset-orange text-foam-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready for Your Custom Board?</h2>
          <p className="text-xl mb-8 opacity-90">
            Whether you're looking for a traditional longboard, an alaia for that
            pure glide, or a handplane for bodysurfing, we'd love to build
            something special for you.
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
