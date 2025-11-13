"use client";

import Link from "next/link";

const footerLinks = [
  {
    title: "Plataforma",
    links: [
      { label: "Como funciona", href: "/#como-funciona" },
      { label: "Mentores", href: "/mentores" },
      { label: "Planos", href: "/pricing" },
    ],
  },
  {
    title: "Suporte",
    links: [
      { label: "Central de ajuda", href: "#" },
      { label: "Acessibilidade", href: "#" },
      { label: "Políticas", href: "#" },
    ],
  },
  {
    title: "Conectar",
    links: [
      { label: "WhatsApp", href: "https://wa.me/5581999999999" },
      { label: "LinkedIn", href: "https://www.linkedin.com" },
      { label: "YouTube", href: "https://www.youtube.com" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-[var(--border-soft)] bg-[color:var(--surface)]">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[2fr,1fr,1fr,1fr] lg:px-8">
        <div>
          <p className="text-lg font-semibold text-[color:var(--text-primary)]">
            Consciência
          </p>
          <p className="mt-4 max-w-sm text-sm text-[color:var(--text-muted)]">
            Aprendizagem contínua, impacto real. Programas personalizados para
            pesquisadores, profissionais, estudantes e empresas.
          </p>
          <p className="mt-6 text-xs text-[color:var(--text-muted)]">
            © {new Date().getFullYear()} Consciência. Todos os direitos
            reservados.
          </p>
        </div>

        {footerLinks.map((section) => (
          <div key={section.title}>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[color:var(--text-primary)]">
              {section.title}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-[color:var(--text-muted)]">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-[color:var(--text-primary)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}

