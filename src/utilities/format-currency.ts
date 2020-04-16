export function formatCurrency(n: number): string {
    n = n || 0;
    return `$${n.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
}
