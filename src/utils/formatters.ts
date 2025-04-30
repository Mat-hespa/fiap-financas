/**
 * Formata um valor monetário em Real (R$).
 * @param amount - O valor a ser formatado.
 * @returns Uma string formatada no estilo monetário brasileiro.
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);
}

/**
 * Formata uma data no padrão brasileiro (dd/mm/aaaa hh:mm:ss).
 * @param dateString - A string da data ou objeto Date a ser formatado.
 * @returns Uma string formatada no estilo brasileiro.
 */
export function formatDate(dateString: string | Date): string {
  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;
  return (
    date.toLocaleDateString("pt-BR") + " " + date.toLocaleTimeString("pt-BR")
  );
}
