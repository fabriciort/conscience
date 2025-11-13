"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Início" },
  { href: "/pricing", label: "Planos" },
  { href: "/mentores", label: "Mentores" },
  { href: "/auth/login", label: "Entrar" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-3 z-50 mx-auto flex w-[min(96%,420px)] items-center justify-between rounded-full bg-[color:var(--surface)] px-2 py-2 shadow-[0_18px_36px_-16px_rgba(26,26,26,0.35)] ring-1 ring-[color:var(--border-soft)] md:hidden">
      {navItems.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === item.href
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-1 flex-col items-center rounded-full px-3 py-2 text-xs font-semibold transition ${
              isActive
                ? "bg-[color:var(--coral)] text-white"
                : "text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)]"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

