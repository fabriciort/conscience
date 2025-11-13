"use client";

type SocialProvider = "google" | "apple" | "facebook";

const providerLabels: Record<SocialProvider, string> = {
  google: "Continuar com Google",
  apple: "Entrar com Apple",
  facebook: "Conectar com Facebook",
};

export function SocialButtons({ disabled }: { disabled?: boolean }) {
  const providers: SocialProvider[] = ["google", "apple", "facebook"];

  return (
    <div className="grid gap-3">
      {providers.map((provider) => (
        <button
          key={provider}
          type="button"
          disabled={disabled}
          className="focus-ring flex items-center justify-center gap-3 rounded-full border border-[color:var(--border-soft)] bg-[color:var(--surface)] px-5 py-3 text-sm font-semibold text-[color:var(--text-primary)] transition hover:border-[color:var(--coral)] hover:text-[color:var(--coral)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--surface-muted)] text-xs font-semibold uppercase text-[color:var(--text-muted)]">
            {provider.slice(0, 1)}
          </span>
          {providerLabels[provider]}
        </button>
      ))}
    </div>
  );
}

