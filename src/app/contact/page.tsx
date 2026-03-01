import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Sly Mongoose Surf",
  description: "Get in touch about custom surfboards, alaias, paipos, or handplanes.",
};

export default function ContactPage() {
  return (
    <div className="bg-sand min-h-screen">
      {/* Hero Section */}
      <section className="bg-ocean-deep text-foam-white py-12 sm:py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Contact Us</h1>
          <p className="text-base sm:text-lg md:text-xl text-ocean-light">
            Let&apos;s talk about your next board
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-10 sm:py-16 md:py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-foam-white rounded-lg shadow-lg p-5 sm:p-8 md:p-12">
            <h2 className="text-xl sm:text-2xl font-bold text-ocean-deep mb-4 sm:mb-6">
              Send us a message
            </h2>
            <p className="text-sm sm:text-base text-drift-wood mb-6 sm:mb-8">
              Whether you&apos;re interested in a custom board, have questions about our
              work, or just want to talk surf—we&apos;d love to hear from you.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
