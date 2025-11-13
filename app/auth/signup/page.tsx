import Link from "next/link";
import { SocialButtons } from "@/components/auth/social-buttons";
import { EmailForm } from "@/components/auth/email-form";

export const metadata = {
  title: "Criar conta Consciência",
  description:
    "Cadastre-se na plataforma Consciência para acessar trilhas, mentorias e comunidades personalizadas.",
};

export default function SignupPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-[color:var(--text-primary)] sm:text-4xl">
        Vamos construir juntos ✨
      </h1>
      <p className="mt-2 text-sm text-[color:var(--text-muted)]">
        Crie sua conta para destravar mentorias, desafios e comunidades de
        aprendizagem.
      </p>

      <div className="mt-8 space-y-6">
        <SocialButtons />
        <div className="relative text-center text-xs uppercase tracking-[0.3em] text-[color:var(--text-muted)]">
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[color:var(--border-soft)]" />
          <span className="relative inline-flex bg-[color:var(--surface)] px-4">
            ou cadastre-se com e-mail
          </span>
        </div>
        <EmailForm mode="signup" />
      </div>

      <p className="mt-8 text-sm text-[color:var(--text-muted)]">
        Já tem conta?{" "}
        <Link
          href="/auth/login"
          className="font-semibold text-[color:var(--coral)]"
        >
          Faça login
        </Link>
      </p>
    </div>
  );
}

