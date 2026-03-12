// types/index.ts

export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address: string;
  city: string;
  country: string;
  taxId?: string;
  createdAt: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
}

export interface CompanyInfo {
  name: string;
  email: string;
  phone?: string;
  address: string;
  city: string;
  country: string;
  taxId?: string;
  logo?: string; // base64
  website?: string;
  bankAccount?: string;
  iban?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  client: Client;
  items: InvoiceItem[];
  currency: string;
  issueDate: string;
  dueDate: string;
  notes?: string;
  discount?: number; // percentage
  createdAt: string;
  updatedAt: string;
}

export type Currency = {
  code: string;
  name: string;
  symbol: string;
};

export const CURRENCIES: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'MAD', name: 'Moroccan Dirham', symbol: 'DH' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'AED' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: 'SAR' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
];

export const TAX_RATES = [0, 5, 7, 10, 14, 20];
