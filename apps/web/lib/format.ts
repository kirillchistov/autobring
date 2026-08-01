export function formatMileage(km: number): string {
  return `${new Intl.NumberFormat("ru-RU").format(km)} км`;
}

export function formatRub(amount: number): string {
  return `${new Intl.NumberFormat("ru-RU").format(amount)} ₽`;
}
