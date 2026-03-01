import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Gallery | Sly Mongoose Surf",
  description: "Photos of our handcrafted surfboards, alaias, paipos, and handplanes.",
};

const galleryItems = [
  { src: "/images/gallery/austin-neill-uHD0uyp79Dg-unsplash.jpg", alt: "Surf photo 1" },
  { src: "/images/gallery/zero-take-QuELIJ3Xb2A-unsplash.jpg", alt: "Surf photo 2" },
  { src: "/images/gallery/oliver-sjostrom-m-qps7eYZl4-unsplash.jpg", alt: "Surf photo 3" },
  { src: "/images/gallery/silas-baisch-LDiZP1yLQxg-unsplash.jpg", alt: "Surf photo 4" },
  { src: "/images/boards/trent-bradley-GIfK6UZA1kY-unsplash.jpg", alt: "Board photo 1" },
  { src: "/images/boards/igor-starkov-f4mLA8nDbRg-unsplash.jpg", alt: "Board photo 2" },
  { src: "/images/boards/sten-rademaker-1kXi2x9t9Fg-unsplash.jpg", alt: "Board photo 3" },
  { src: "/images/boards/josh-muller-yG9x3th3GYI-unsplash.jpg", alt: "Board photo 4" },
  { src: "/images/boards/bruno-cervera-4rvc6HWITpY-unsplash.jpg", alt: "Board photo 5" },
];

export default function GalleryPage() {
  return (
    <div className="bg-sand">
      {/* Hero Section */}
      <section className="bg-ocean-deep text-foam-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Gallery</h1>
          <p className="text-xl text-ocean-light">
            A look at some of our work
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-drift-wood text-lg">
              Follow us on Instagram for more photos and updates.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
