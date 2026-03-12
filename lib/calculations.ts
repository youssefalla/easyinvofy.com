// lib/calculations.ts
import { InvoiceItem } from '@/types';

export function calculateItemTotal(item: InvoiceItem): number {
  const subtotal = item.quantity * item.unitPrice;
  const tax = subtotal * (item.taxRate / 100);
  return subtotal + tax;
}

export function calculateItemSubtotal(item: InvoiceItem): number {
  return item.quantity * item.unitPrice;
}

export function calculateItemTax(item: InvoiceItem): number {
  const subtotal = item.quantity * item.unitPrice;
  return subtotal * (item.taxRate / 100);
}

export function calculateInvoiceTotals(items: InvoiceItem[], discount = 0) {
  const subtotal = items.reduce((sum, item) => sum + calculateItemSubtotal(item), 0);
  const totalTax = items.reduce((sum, item) => sum + calculateItemTax(item), 0);
  const discountAmount = subtotal * (discount / 100);
  const total = subtotal + totalTax - discountAmount;

  return {
    subtotal,
    totalTax,
    discountAmount,
    total,
  };
}

export function formatCurrency(amount: number, symbol: string): string {
  return `${symbol} ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function generateInvoiceNumber(existing: string[]): string {
  const year = new Date().getFullYear();
  const prefix = `INV-${year}-`;
  const numbers = existing
    .filter(n => n.startsWith(prefix))
    .map(n => parseInt(n.replace(prefix, '')) || 0);
  const next = numbers.length > 0 ? Math.max(...numbers) + 1 : 1;
  return `${prefix}${String(next).padStart(4, '0')}`;
}
