import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Links | Sly Mongoose Surf",
  description: "Links to friends, resources, and inspiration.",
};

const links = [
  {
    category: "Friends & Fellow Shapers",
    items: [
      { name: "[Friend/Shaper Name]", url: "#", description: "Description here" },
      { name: "[Friend/Shaper Name]", url: "#", description: "Description here" },
    ],
  },
  {
    category: "Surf Culture & Resources",
    items: [
      { name: "[Resource Name]", url: "#", description: "Description here" },
      { name: "[Resource Name]", url: "#", description: "Description here" },
    ],
  },
  {
    category: "Materials & Supplies",
    items: [
      { name: "[Supplier Name]", url: "#", description: "Description here" },
    ],
  },
];

export default function LinksPage() {
  return (
    <div className="bg-sand min-h-screen">
      {/* Hero Section */}
      <section className="bg-ocean-deep text-foam-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Links</h1>
          <p className="text-xl text-ocean-light">
            Friends, resources, and inspiration
          </p>
        </div>
      </section>

      {/* Links Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {links.map((section) => (
              <div key={section.category} className="bg-foam-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-ocean-deep mb-6">
                  {section.category}
                </h2>
                <ul className="space-y-4">
                  {section.items.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block"
                      >
                        <span className="text-lg font-semibold text-sunset-orange group-hover:underline">
                          {link.name}
                        </span>
                        <p className="text-drift-wood">{link.description}</p>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-drift-wood">
              Know of a link that should be here?{" "}
              <a href="/contact" className="text-sunset-orange hover:underline">
                Let us know
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
