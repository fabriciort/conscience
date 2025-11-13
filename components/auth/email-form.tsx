"use client";

import { FormEvent, useState } from "react";

type AuthMode = "login" | "signup";

type FormState = {
  name: string;
  email: string;
  password: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

type EmailFormProps = {
  mode: AuthMode;
};

export function EmailForm({ mode }: EmailFormProps) {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: FormErrors = {};

    if (mode === "signup" && !formState.name.trim()) {
      nextErrors.name = "Informe seu nome completo.";
    }

    if (!formState.email.trim()) {
      nextErrors.email = "Informe um e-mail válido.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      nextErrors.email = "Formato de e-mail inválido.";
    }

    if (formState.password.length < 8) {
      nextErrors.password = "A senha deve ter pelo menos 8 caracteres.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setStatus("success");
    }
  };

  return (
    <form className="mt-6 space-y-5" onSubmit={handleSubmit} noValidate>
      {mode === "signup" && (
        <Field
          label="Nome completo"
          name="name"
          autoComplete="name"
          value={formState.name}
          error={errors.name}
          onChange={(value) => setFormState((prev) => ({ ...prev, name: value }))}
        />
      )}

      <Field
        label="E-mail"
        name="email"
        type="email"
        autoComplete={mode === "login" ? "email" : "username"}
        value={formState.email}
        error={errors.email}
        onChange={(value) => setFormState((prev) => ({ ...prev, email: value }))}
      />

      <Field
        label="Senha"
        name="password"
        type="password"
        autoComplete={mode === "login" ? "current-password" : "new-password"}
        value={formState.password}
        error={errors.password}
        onChange={(value) =>
          setFormState((prev) => ({ ...prev, password: value }))
        }
      />

      <button
        type="submit"
        className="focus-ring w-full rounded-full bg-[color:var(--coral)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:shadow-lg"
      >
        {mode === "login" ? "Entrar na plataforma" : "Criar conta Consciência"}
      </button>

      {status === "success" && (
        <p
          role="status"
          className="rounded-2xl bg-[color:var(--sage)]/60 px-4 py-3 text-sm font-medium text-[color:var(--charcoal)]"
        >
          Tudo certo! Enviamos um e-mail com os próximos passos.
        </p>
      )}
    </form>
  );
}

type FieldProps = {
  label: string;
  name: keyof FormState;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
};

function Field({
  label,
  name,
  value,
  error,
  onChange,
  type = "text",
  autoComplete,
}: FieldProps) {
  const id = `auth-${name}`;
  const describedBy = error ? `${id}-error` : undefined;

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-sm font-semibold text-[color:var(--text-primary)]"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className="focus-ring w-full rounded-full border border-[color:var(--border-soft)] bg-[color:var(--surface-muted)] px-5 py-3 text-sm text-[color:var(--text-primary)] outline-none transition placeholder:text-[color:var(--text-muted)]"
        placeholder={`Digite seu ${label.toLowerCase()}`}
      />
      {error && (
        <p
          id={describedBy}
          className="text-xs font-medium text-[color:var(--coral)]"
        >
          {error}
        </p>
      )}
    </div>
  );
}

