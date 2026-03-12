'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import { storage } from '@/lib/storage';
import { Invoice, Client } from '@/types';
import { calculateInvoiceTotals, formatCurrency } from '@/lib/calculations';
import { CURRENCIES } from '@/types';
import { FileText, Users, TrendingUp, Clock, PlusCircle, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    setInvoices(storage.getInvoices());
    setClients(storage.getClients());
  }, []);

  const totalRevenue = invoices
    .filter(i => i.status === 'paid')
    .reduce((sum, inv) => {
      const { total } = calculateInvoiceTotals(inv.items, inv.discount);
      return sum + total;
    }, 0);

  const pending = invoices.filter(i => i.status === 'sent' || i.status === 'draft').length;
  const overdue = invoices.filter(i => i.status === 'overdue').length;

  const recentInvoices = [...invoices]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const stats = [
    {
      label: 'Revenue',
      value: `$${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
      color: 'text-emerald-400',
    },
    {
      label: 'Invoices',
      value: invoices.length,
      color: 'text-blue-400',
    },
    {
      label: 'Clients',
      value: clients.length,
      color: 'text-purple-400',
    },
    {
      label: 'Pending',
      value: pending,
      color: 'text-orange-400',
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#0e0d14]">
      <Sidebar />
      <main className="flex-1 ml-60 p-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8 hidden"
        >
          <div>
            <h1 className="text-2xl font-bold text-zinc-100" style={{ fontFamily: 'var(--font-poppins)' }}>
              Dashboard
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <Link href="/new-invoice" className="btn-primary">
            <PlusCircle className="w-4 h-4" />
            New Invoice
          </Link>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8 mt-4">
          {stats.map(({ label, value, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card p-6 flex flex-col items-center justify-center text-center hover:bg-[#1a1b26] transition-colors"
            >
              <p className="text-zinc-400 text-sm font-medium mb-3">{label}</p>
              <p className={`text-3xl font-bold tracking-tight ${color}`}>{value}</p>
            </motion.div>
          ))}
        </div>

        {/* Recent Invoices + Quick Actions */}
        <div className="grid grid-cols-3 gap-6">
          {/* Recent Invoices */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="card col-span-2"
          >
            <div className="flex items-center justify-between p-5 border-b border-white/5 hidden">
              <h2 className="font-semibold text-zinc-100">Recent Invoices</h2>
              <Link href="/invoices" className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1 transition-colors">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="divide-y divide-white/5">
              {recentInvoices.length === 0 ? (
                <div className="p-8 text-center">
                  <FileText className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
                  <p className="text-zinc-500 text-sm">No invoices yet</p>
                  <Link href="/new-invoice" className="text-xs text-violet-400 hover:text-violet-300 underline underline-offset-2 mt-1 inline-block">
                    Create your first invoice
                  </Link>
                </div>
              ) : recentInvoices.map(invoice => {
                const { total } = calculateInvoiceTotals(invoice.items, invoice.discount);
                const currency = CURRENCIES.find(c => c.code === invoice.currency);
                return (
                  <Link key={invoice.id} href={`/invoices/${invoice.id}`}
                    className="flex flex-row items-center justify-between p-5 hover:bg-white/5 transition-colors group">
                    <div className="flex items-center justify-between w-full max-w-lg">
                      <p className="text-sm font-medium text-zinc-400 font-mono w-32">{invoice.invoiceNumber}</p>
                      <p className="text-sm text-zinc-400 w-48">{invoice.client.name}</p>
                    </div>
                    <div className="flex items-center gap-12">
                      <span className={`status-badge status-${invoice.status} w-20 justify-center`}>
                        {invoice.status.toLowerCase()}
                      </span>
                      <p className="text-sm font-semibold text-white w-24 text-right">
                        {formatCurrency(total, currency?.symbol || '$')}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col gap-6"
          >
            <div className="card p-6 border-white/5">
              <h2 className="font-semibold text-zinc-100 mb-5">Quick Actions</h2>
              <div className="flex flex-col gap-3">
                <Link href="/new-invoice" className="btn-primary justify-center font-semibold">
                  <PlusCircle className="w-4 h-4 text-[#eadeff]" /> New Invoice
                </Link>
                <Link href="/clients" className="btn-secondary justify-center">
                  <Users className="w-4 h-4" /> Manage Clients
                </Link>
                <Link href="/settings" className="btn-secondary justify-center">
                  <FileText className="w-4 h-4" /> Company Settings
                </Link>
              </div>
            </div>

            {overdue > 0 && (
              <div className="card p-6 border-red-900/50 bg-red-900/10">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-red-500" />
                  <p className="font-semibold text-red-500 text-sm">Overdue Invoices</p>
                </div>
                <p className="text-red-400 text-sm">You have <strong className="text-red-500">{overdue}</strong> overdue invoice{overdue > 1 ? 's' : ''}.</p>
                <Link href="/invoices?filter=overdue" className="text-xs text-red-400 hover:text-red-300 underline underline-offset-2 mt-3 inline-block transition-colors">
                  View overdue →
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
