/**
 * Formats monetary values into Indian Rupees (₹ INR)
 * E.g., ₹1,499 or ₹1,42,805
 */
export function formatRupees(amount: number): string {
  if (isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
