'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import { storage } from '@/lib/storage';
import { Invoice } from '@/types';
import { calculateInvoiceTotals, formatCurrency } from '@/lib/calculations';
import { CURRENCIES } from '@/types';
import { FileText, Plus, Search, Trash2, Eye, Download } from 'lucide-react';
import { format } from 'date-fns';

type FilterStatus = 'all' | 'draft' | 'sent' | 'paid' | 'overdue';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterStatus>('all');

  useEffect(() => {
    setInvoices(storage.getInvoices());
  }, []);

  const filtered = invoices
    .filter(inv => filter === 'all' || inv.status === filter)
    .filter(inv =>
      inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      inv.client.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleDelete = (id: string) => {
    if (confirm('Delete this invoice?')) {
      storage.deleteInvoice(id);
      setInvoices(storage.getInvoices());
    }
  };

  const statusFilters: { label: string; value: FilterStatus }[] = [
    { label: 'All', value: 'all' },
    { label: 'Draft', value: 'draft' },
    { label: 'Sent', value: 'sent' },
    { label: 'Paid', value: 'paid' },
    { label: 'Overdue', value: 'overdue' },
  ];

  return (
    <div className="flex min-h-screen bg-[#0e0d14]">
      <Sidebar />
      <main className="flex-1 ml-60 p-10 animate-fade-in">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-zinc-100" style={{ fontFamily: 'var(--font-poppins)' }}>
              Invoices
            </h1>
            <p className="text-zinc-400 text-sm mt-1">{invoices.length} total invoices</p>
          </div>
          <Link href="/new-invoice" className="btn-primary">
            <Plus className="w-4 h-4" /> New Invoice
          </Link>
        </div>

        {/* Filters + Search */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              className="input pl-9 border-white/10"
              placeholder="Search by number or client..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-1 bg-[#16161e] rounded-xl border border-white/5 p-1">
            {statusFilters.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${filter === value
                    ? 'bg-zinc-800 text-zinc-100'
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="card overflow-hidden border-white/5">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5 bg-[#1a1b26]">
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">Invoice</th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">Client</th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">Issue Date</th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">Due Date</th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">Status</th>
                <th className="text-right text-xs font-medium text-zinc-500 uppercase tracking-wider px-6 py-4">Amount</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-16">
                    <FileText className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
                    <p className="text-zinc-500 text-sm">No invoices found</p>
                  </td>
                </tr>
              ) : filtered.map(invoice => {
                const { total } = calculateInvoiceTotals(invoice.items, invoice.discount);
                const currency = CURRENCIES.find(c => c.code === invoice.currency);
                return (
                  <tr key={invoice.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-zinc-300 font-mono">{invoice.invoiceNumber}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-zinc-300">{invoice.client.name}</p>
                      <p className="text-xs text-zinc-500">{invoice.client.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-zinc-400">
                        {format(new Date(invoice.issueDate), 'MMM d, yyyy')}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-zinc-400">
                        {format(new Date(invoice.dueDate), 'MMM d, yyyy')}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`status-badge status-${invoice.status}`}>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-sm font-semibold text-white">
                        {formatCurrency(total, currency?.symbol || '$')}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/invoices/${invoice.id}`}
                          className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-500 hover:text-zinc-300 transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(invoice.id)}
                          className="p-1.5 rounded-lg hover:bg-red-900/30 text-zinc-500 hover:text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
