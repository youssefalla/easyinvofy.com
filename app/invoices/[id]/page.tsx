'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import InvoiceDocument from '@/components/InvoiceDocument';
import { storage } from '@/lib/storage';
import { Invoice, CompanyInfo } from '@/types';
import { ArrowLeft, Printer, Edit, Trash2, CheckCircle } from 'lucide-react';

export default function InvoiceDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [company, setCompany] = useState<CompanyInfo | null>(null);

  useEffect(() => {
    const inv = storage.getInvoice(id as string);
    if (!inv) { router.push('/invoices'); return; }
    setInvoice(inv);
    setCompany(storage.getCompany());
  }, [id, router]);

  const handlePrint = () => window.print();

  const handleMarkPaid = () => {
    if (!invoice) return;
    const updated = { ...invoice, status: 'paid' as const, updatedAt: new Date().toISOString() };
    storage.updateInvoice(updated);
    setInvoice(updated);
  };

  const handleDelete = () => {
    if (!confirm('Delete this invoice?')) return;
    storage.deleteInvoice(id as string);
    router.push('/invoices');
  };

  if (!invoice) return null;

  return (
    <div className="flex min-h-screen bg-[#0e0d14]">
      <div className="no-print">
        <Sidebar />
      </div>
      <main className="flex-1 ml-60 p-10 animate-fade-in no-print-offset">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8 no-print">
          <Link href="/invoices" className="btn-secondary">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="flex gap-2">
            {invoice.status !== 'paid' && (
              <button onClick={handleMarkPaid} className="btn-secondary">
                <CheckCircle className="w-4 h-4 text-emerald-500" /> Mark as Paid
              </button>
            )}
            <Link href={`/invoices/${id}/edit`} className="btn-secondary">
              <Edit className="w-4 h-4" /> Edit
            </Link>
            <button onClick={handlePrint} className="btn-primary">
              <Printer className="w-4 h-4" /> Print / PDF
            </button>
            <button onClick={handleDelete} className="btn-danger">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Invoice Document Wrapper */}
        <div className="max-w-3xl mx-auto">
          <InvoiceDocument invoice={invoice} company={company} />
        </div>
      </main>
    </div>
  );
}

