import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About | Sly Mongoose Surf",
  description: "Learn about Sly Mongoose Surf and our passion for handcrafted surfboards.",
};

export default function AboutPage() {
  return (
    <div className="bg-sand">
      {/* Hero Section */}
      <section className="bg-ocean-deep text-foam-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">About Us</h1>
          <p className="text-xl text-ocean-light">
            The story behind Sly Mongoose Surf
          </p>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-foam-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-80">
              <Image
                src="/images/boards/josh-muller-yG9x3th3GYI-unsplash.jpg"
                alt="Sly Mongoose Surf"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-ocean-deep mb-6">
                Our Story
              </h2>
              <div className="prose prose-lg text-drift-wood space-y-4">
                <p>
                  [This is where your personal story goes. Talk about how you got
                  into shaping, what drives your passion for the craft, and what
                  makes Sly Mongoose Surf unique.]
                </p>
                <p>
                  [Share the philosophy behind your work—why you choose certain
                  materials, your approach to design, and what you hope people
                  experience when they ride one of your boards.]
                </p>
                <p>
                  [Include any relevant background—influences, mentors, or
                  experiences that have shaped your craft.]
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values/Philosophy */}
      <section className="py-16 md:py-24 bg-foam-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-ocean-deep mb-12">
            Our Philosophy
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-sunset-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-foam-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-ocean-deep mb-2">Passion</h3>
              <p className="text-drift-wood">
                Every board is shaped with genuine love for the craft and respect
                for the ocean.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-sunset-gold rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-foam-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-ocean-deep mb-2">Craftsmanship</h3>
              <p className="text-drift-wood">
                Traditional techniques meet modern understanding for boards that
                truly perform.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-ocean-light rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-foam-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-ocean-deep mb-2">Community</h3>
              <p className="text-drift-wood">
                Part of a global tribe of surfers, shapers, and ocean lovers.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
