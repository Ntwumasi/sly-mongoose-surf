"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/posts", label: "Blog Posts", icon: "📝" },
  { href: "/admin/images", label: "Images", icon: "🖼️" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="w-64 bg-ocean-deep min-h-screen flex flex-col">
      <div className="p-6 border-b border-ocean-light">
        <Link href="/admin">
          <h1 className="text-xl font-bold text-sunset-gold">
            SMS Admin
          </h1>
        </Link>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-sunset-orange text-foam-white"
                      : "text-ocean-light hover:bg-ocean-light/20 hover:text-foam-white"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-ocean-light">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2 text-ocean-light hover:text-foam-white transition-colors text-sm"
        >
          ← View Site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 text-ocean-light hover:text-coral transition-colors text-sm mt-2"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}
