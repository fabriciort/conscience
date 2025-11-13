"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";

const navigation = [
  { href: "/", label: "Início" },
  { href: "/pricing", label: "Planos" },
  { href: "/mentores", label: "Mentores" },
  { href: "/auth/login", label: "Entrar" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-soft)] bg-[color:var(--surface)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Logo />
          <span className="hidden text-sm text-[color:var(--text-muted)] md:block">
            Aprendizagem em rede com impacto real
          </span>
        </div>

        <nav className="hidden items-center gap-2 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-[color:var(--text-muted)] transition-colors hover:bg-[color:var(--surface-muted)] hover:text-[color:var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--coral)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex">
          <Link
            href="/pricing"
            className="rounded-full bg-[color:var(--coral)] px-6 py-2 text-sm font-semibold text-white shadow-[var(--shadow-soft)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--coral)]"
          >
            Assine agora
          </Link>
        </div>

        <button
          type="button"
          className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border md:hidden"
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className="relative w-5">
            <span
              className={`absolute left-1/2 top-1 h-[2px] w-5 -translate-x-1/2 bg-current transition-transform ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-1/2 top-1/2 h-[2px] w-5 -translate-x-1/2 -translate-y-1/2 bg-current transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-1/2 bottom-1 h-[2px] w-5 -translate-x-1/2 bg-current transition-transform ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {open && (
        <nav className="border-t border-[var(--border-soft)] bg-[color:var(--surface)]/95 px-4 pb-6 pt-4 shadow-lg md:hidden">
          <ul className="flex flex-col gap-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-2xl bg-[color:var(--surface-muted)] px-4 py-3 text-sm font-semibold text-[color:var(--text-primary)] transition hover:bg-[color:var(--coral)] hover:text-white"
                >
                  {item.label}
                  <span aria-hidden className="text-xs font-medium text-white">
                    →
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/pricing"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center rounded-full bg-[color:var(--coral)] px-4 py-3 text-sm font-semibold text-white shadow-[var(--shadow-soft)]"
              >
                Assinar Consciência
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

