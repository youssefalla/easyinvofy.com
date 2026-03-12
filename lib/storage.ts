// lib/storage.ts
import { Client, Invoice, CompanyInfo } from '@/types';

const KEYS = {
  clients: 'invoice_clients',
  invoices: 'invoice_invoices',
  company: 'invoice_company',
};

export const storage = {
  // Clients
  getClients: (): Client[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(KEYS.clients);
    return data ? JSON.parse(data) : [];
  },
  saveClients: (clients: Client[]) => {
    localStorage.setItem(KEYS.clients, JSON.stringify(clients));
  },
  addClient: (client: Client) => {
    const clients = storage.getClients();
    clients.push(client);
    storage.saveClients(clients);
  },
  updateClient: (client: Client) => {
    const clients = storage.getClients().map(c => c.id === client.id ? client : c);
    storage.saveClients(clients);
  },
  deleteClient: (id: string) => {
    const clients = storage.getClients().filter(c => c.id !== id);
    storage.saveClients(clients);
  },

  // Invoices
  getInvoices: (): Invoice[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(KEYS.invoices);
    return data ? JSON.parse(data) : [];
  },
  saveInvoices: (invoices: Invoice[]) => {
    localStorage.setItem(KEYS.invoices, JSON.stringify(invoices));
  },
  addInvoice: (invoice: Invoice) => {
    const invoices = storage.getInvoices();
    invoices.push(invoice);
    storage.saveInvoices(invoices);
  },
  updateInvoice: (invoice: Invoice) => {
    const invoices = storage.getInvoices().map(i => i.id === invoice.id ? invoice : i);
    storage.saveInvoices(invoices);
  },
  deleteInvoice: (id: string) => {
    const invoices = storage.getInvoices().filter(i => i.id !== id);
    storage.saveInvoices(invoices);
  },
  getInvoice: (id: string): Invoice | undefined => {
    return storage.getInvoices().find(i => i.id === id);
  },

  // Company Info
  getCompany: (): CompanyInfo | null => {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(KEYS.company);
    return data ? JSON.parse(data) : null;
  },
  saveCompany: (company: CompanyInfo) => {
    localStorage.setItem(KEYS.company, JSON.stringify(company));
  },
};
