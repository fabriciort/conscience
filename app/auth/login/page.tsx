import Link from "next/link";
import { SocialButtons } from "@/components/auth/social-buttons";
import { EmailForm } from "@/components/auth/email-form";

export const metadata = {
  title: "Entrar na Consciência",
  description:
    "Acesse sua conta Consciência para acompanhar trilhas, mentorias e comunidades.",
};

export default function LoginPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-[color:var(--text-primary)] sm:text-4xl">
        Bem-vindo de volta 👋
      </h1>
      <p className="mt-2 text-sm text-[color:var(--text-muted)]">
        Entre com e-mail ou continue com sua rede preferida.
      </p>

      <div className="mt-8 space-y-6">
        <SocialButtons />
        <div className="relative text-center text-xs uppercase tracking-[0.3em] text-[color:var(--text-muted)]">
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[color:var(--border-soft)]" />
          <span className="relative inline-flex bg-[color:var(--surface)] px-4">
            ou use seu e-mail
          </span>
        </div>
        <EmailForm mode="login" />
      </div>

      <p className="mt-8 text-sm text-[color:var(--text-muted)]">
        Ainda não tem uma conta?{" "}
        <Link
          href="/auth/signup"
          className="font-semibold text-[color:var(--coral)]"
        >
          Crie agora
        </Link>
      </p>
    </div>
  );
}

