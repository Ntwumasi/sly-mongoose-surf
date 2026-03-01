import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ocean-deep text-foam-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-sunset-gold mb-4">
              Sly Mongoose Surf
            </h3>
            <p className="text-ocean-light">
              Handcrafted surfboards, alaias, paipos, and handplanes.
              Built with passion for the ocean.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-ocean-light hover:text-sunset-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/boards" className="text-ocean-light hover:text-sunset-gold transition-colors">
                  What We Build
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-ocean-light hover:text-sunset-gold transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-ocean-light hover:text-sunset-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
            <p className="text-ocean-light mb-2">
              Interested in a custom board?
            </p>
            <Link
              href="/contact"
              className="inline-block bg-sunset-orange hover:bg-sunset-gold text-foam-white font-semibold px-6 py-2 rounded transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="border-t border-ocean-light mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center text-ocean-light">
          <p>&copy; {new Date().getFullYear()} Sly Mongoose Surf. All rights reserved.</p>
          <Link
            href="/admin/login"
            className="mt-4 sm:mt-0 text-sm text-ocean-light/60 hover:text-sunset-gold transition-colors"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
