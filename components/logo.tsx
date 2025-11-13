"use client";

import Link from "next/link";

type LogoProps = {
  compact?: boolean;
};

export function Logo({ compact = false }: LogoProps) {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 font-semibold tracking-tight text-[var(--text-primary)]"
      aria-label="Consciência - Início"
    >
      <span className="text-lg sm:text-xl">Consciência</span>
      {!compact && (
        <span className="rounded-full bg-[var(--coral)] px-2 py-0.5 text-xs font-medium uppercase text-white">
          Beta
        </span>
      )}
    </Link>
  );
}

