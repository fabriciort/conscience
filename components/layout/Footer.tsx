import Link from 'next/link';

const footerColumns = [
  {
    title: 'Plataforma',
    links: [
      { label: 'Feed principal', href: '/platform/feed' },
      { label: 'Mentorias', href: '/platform/researchers' },
      { label: 'Programas ao vivo', href: '/#operations' },
      { label: 'Planos e preços', href: '/pricing' },
    ],
  },
  {
    title: 'Conscience para',
    links: [
      { label: 'Pesquisadores', href: '/studio/dashboard' },
      { label: 'Equipes de Produto', href: '/#inspiration' },
      { label: 'Educação Corporativa', href: '/#operations' },
      { label: 'Startups em escala', href: '/#tech' },
    ],
  },
  {
    title: 'Conteúdos',
    links: [
      { label: 'Inspiração', href: '/#inspiration' },
      { label: 'Tech Radar', href: '/#tech' },
      { label: 'Experts', href: '/#experts' },
      { label: 'Guias de Aprendizagem', href: '/#learn' },
    ],
  },
  {
    title: 'Use Cases',
    links: [
      { label: 'Labs corporativos', href: '#' },
      { label: 'Academias personalizadas', href: '#' },
      { label: 'Comunidades B2B', href: '#' },
      { label: 'Onboarding criativo', href: '#' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { label: 'Central de ajuda', href: '#' },
      { label: 'Política de privacidade', href: '#' },
      { label: 'Acessibilidade', href: '#' },
      { label: 'Status da plataforma', href: '#' },
    ],
  },
  {
    title: 'Companhia',
    links: [
      { label: 'Sobre a Conscience', href: '#' },
      { label: 'Carreiras', href: '#' },
      { label: 'Imprensa', href: '#' },
      { label: 'Contato', href: 'mailto:hello@conscience.com' },
    ],
  },
];

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com' },
  { label: 'YouTube', href: 'https://www.youtube.com' },
  { label: 'Instagram', href: 'https://www.instagram.com' },
  { label: 'X', href: 'https://x.com' },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.8fr,3fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
              The Column
            </p>
            <h3 className="mt-4 text-3xl font-semibold">
              Histórias sobre software, pesquisa aplicada e pessoas.
            </h3>
            <p className="mt-4 text-sm text-white/70">
              Assine a newsletter semanal para receber entrevistas com experts,
              frameworks inéditos e anúncios das próximas edições.
            </p>
            <form className="mt-6 flex flex-col gap-3 sm:flex-row">
              <label htmlFor="footer-email" className="sr-only">
                Email
              </label>
              <input
                id="footer-email"
                type="email"
                required
                className="h-11 flex-1 rounded-full border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-white/40 focus:border-white focus:outline-none"
                placeholder="seu@email.com"
              />
              <button
                type="submit"
                className="h-11 rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Assinar
              </button>
            </form>
          </div>

          <div className="grid gap-8 text-sm text-white/70 sm:grid-cols-2 lg:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                  {column.title}
                </p>
                <ul className="mt-4 space-y-2">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="transition hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} Conscience. Todos os direitos reservados.</p>
          <div className="flex flex-wrap gap-4">
            {socialLinks.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

