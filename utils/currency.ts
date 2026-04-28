export function formatIDR(value: number): string {
  const safe = Number.isFinite(value) ? Math.max(0, Math.round(value)) : 0;
  return `Rp ${safe.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
}
