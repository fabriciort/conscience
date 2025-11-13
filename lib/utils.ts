export function getWhatsAppLink(message: string) {
  const number =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5581999999999";
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}

export function formatCurrencyBRL(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

