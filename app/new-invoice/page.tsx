'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import InvoiceDocument from '@/components/InvoiceDocument';
import { storage } from '@/lib/storage';
import { Client, Invoice, InvoiceItem, CURRENCIES, TAX_RATES, CompanyInfo } from '@/types';
import { calculateInvoiceTotals, calculateItemSubtotal, calculateItemTax, formatCurrency, generateInvoiceNumber } from '@/lib/calculations';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Trash2, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function newItem(): InvoiceItem {
  return { id: uuidv4(), description: '', quantity: 1, unitPrice: 0, taxRate: 20 };
}

export default function NewInvoicePage() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [company, setCompany] = useState<CompanyInfo | null>(null);
  const [selectedClientId, setSelectedClientId] = useState('');
  const [items, setItems] = useState<InvoiceItem[]>([newItem()]);
  const [currency, setCurrency] = useState('USD');
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date(); d.setDate(d.getDate() + 30);
    return d.toISOString().split('T')[0];
  });
  const [notes, setNotes] = useState('');
  const [discount, setDiscount] = useState(0);
  const [status, setStatus] = useState<Invoice['status']>('draft');

  useEffect(() => {
    setClients(storage.getClients());
    setCompany(storage.getCompany());
  }, []);

  const selectedClient = clients.find(c => c.id === selectedClientId);
  const currencyObj = CURRENCIES.find(c => c.code === currency) || CURRENCIES[0];
  const { subtotal, totalTax, discountAmount, total } = calculateInvoiceTotals(items, discount);
  const fmt = (n: number) => formatCurrency(n, currencyObj.symbol);

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const removeItem = (id: string) => {
    if (items.length === 1) return;
    setItems(items.filter(i => i.id !== id));
  };

  const existingInvoices = typeof window !== 'undefined' ? storage.getInvoices() : [];
  const previewInvoiceNumber = generateInvoiceNumber(existingInvoices.map(i => i.invoiceNumber));

  const buildInvoiceObject = (): Invoice => ({
    id: 'preview',
    invoiceNumber: previewInvoiceNumber,
    status,
    client: selectedClient || { id: 'preview', name: '', email: '', address: '', city: '', country: '', taxId: '', createdAt: '' },
    items,
    currency,
    issueDate,
    dueDate,
    notes,
    discount,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const handleSave = () => {
    if (!selectedClient) { alert('Please select a client.'); return; }
    if (items.some(i => !i.description)) { alert('Please fill in all item descriptions.'); return; }

    const invoiceToSave = buildInvoiceObject();
    invoiceToSave.id = uuidv4();
    storage.addInvoice(invoiceToSave);
    router.push(`/invoices/${invoiceToSave.id}`);
  };

  return (
    <div className="flex min-h-screen bg-[#0e0d14]">
      <Sidebar />
      <main className="flex-1 ml-60 p-10 animate-fade-in">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/invoices" className="btn-secondary">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-zinc-100" style={{ fontFamily: 'var(--font-poppins)' }}>
                New Invoice
              </h1>
              <p className="text-zinc-400 text-sm mt-0.5">Fill in the details below</p>
            </div>
          </div>
          <button onClick={handleSave} className="btn-primary">
            <Save className="w-4 h-4" /> Save Invoice
          </button>
        </div>

        <div className="flex flex-col xl:flex-row gap-8 items-start">
          {/* Left: Main form */}
          <div className="w-full xl:w-1/2 space-y-6">
            {/* Client + Dates */}
            <div className="card p-6 border-white/5">
              <h2 className="font-semibold text-zinc-100 mb-5">Invoice Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="label">Client *</label>
                  {clients.length === 0 ? (
                    <div className="p-3 bg-amber-900/20 border border-amber-500/20 rounded-lg text-xs text-amber-400">
                      No clients yet.{' '}
                      <Link href="/clients" className="underline font-medium hover:text-amber-300">Add a client first</Link>
                    </div>
                  ) : (
                    <select
                      className="input"
                      value={selectedClientId}
                      onChange={e => setSelectedClientId(e.target.value)}
                    >
                      <option value="">Select a client...</option>
                      {clients.map(c => (
                        <option key={c.id} value={c.id}>{c.name} — {c.email}</option>
                      ))}
                    </select>
                  )}
                </div>
                <div>
                  <label className="label">Issue Date</label>
                  <input type="date" className="input" value={issueDate} onChange={e => setIssueDate(e.target.value)} />
                </div>
                <div>
                  <label className="label">Due Date</label>
                  <input type="date" className="input" value={dueDate} onChange={e => setDueDate(e.target.value)} />
                </div>
                <div>
                  <label className="label">Currency</label>
                  <select className="input" value={currency} onChange={e => setCurrency(e.target.value)}>
                    {CURRENCIES.map(c => (
                      <option key={c.code} value={c.code}>{c.code} — {c.name} ({c.symbol})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">Status</label>
                  <select className="input" value={status} onChange={e => setStatus(e.target.value as Invoice['status'])}>
                    <option value="draft">Draft</option>
                    <option value="sent">Sent</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="card p-6 border-white/5 flex flex-col relative z-20">
              <h2 className="font-semibold text-zinc-100 mb-5">Line Items</h2>

              {/* Header */}
              <div className="grid grid-cols-12 gap-2 mb-2">
                <div className="col-span-4"><span className="label">Description</span></div>
                <div className="col-span-2"><span className="label">Qty</span></div>
                <div className="col-span-2"><span className="label">Unit Price</span></div>
                <div className="col-span-3"><span className="label">Tax %</span></div>
                <div className="col-span-1"></div>
              </div>

              <div className="space-y-2">
                {items.map(item => {
                  return (
                    <div key={item.id} className="grid grid-cols-12 gap-2 items-center group">
                      <div className="col-span-4 flex">
                        <input
                          className="input"
                          placeholder="Item description..."
                          value={item.description}
                          onChange={e => updateItem(item.id, 'description', e.target.value)}
                        />
                      </div>
                      <div className="col-span-2 flex">
                        <input
                          type="number" min="0" step="0.01" className="input"
                          value={item.quantity}
                          onChange={e => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="col-span-2 flex">
                        <input
                          type="number" min="0" step="0.01" className="input"
                          value={item.unitPrice}
                          onChange={e => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="col-span-3 flex">
                         <select
                           className="input"
                           value={item.taxRate}
                           onChange={e => updateItem(item.id, 'taxRate', parseFloat(e.target.value))}
                         >
                           {TAX_RATES.map(r => <option key={r} value={r}>{r}%</option>)}
                         </select>
                      </div>
                      <div className="col-span-1 flex justify-end">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-900/30 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => setItems([...items, newItem()])}
                className="mt-4 flex items-center gap-1.5 w-fit text-xs text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add line item
              </button>
              
              <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                 <span className="text-zinc-400 text-sm">Discount</span>
                 <div className="flex items-center gap-2">
                   <input
                     type="number" min="0" max="100" className="w-20 input text-center py-1.5 px-2"
                     value={discount}
                     onChange={e => setDiscount(parseFloat(e.target.value) || 0)}
                   />
                   <span className="text-zinc-500 text-sm">%</span>
                 </div>
              </div>
            </div>

            {/* Notes */}
            <div className="card p-6 border-white/5">
              <h2 className="font-semibold text-zinc-100 mb-4">Notes</h2>
              <textarea
                className="input resize-none"
                rows={3}
                placeholder="Payment terms, thank you message, or any other notes..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
              />
            </div>
            
            <button onClick={handleSave} className="btn-primary w-full justify-center py-3">
              <Save className="w-4 h-4" /> Save Invoice
            </button>
          </div>

          {/* Right: Live Preview */}
          <div className="w-full xl:w-1/2 sticky top-10 flex flex-col items-center">
            <h2 className="font-semibold text-zinc-400 text-sm mb-4 tracking-wide uppercase self-start">Live Preview</h2>
            <div className="w-full bg-[#16161e] rounded-2xl border border-white/5 flex justify-center items-start overflow-hidden pt-8 pb-8" style={{ minHeight: '800px' }}>
               <div className="origin-top scale-[0.6] sm:scale-[0.8] lg:scale-[0.9] xl:scale-[0.75] 2xl:scale-[0.85] transition-transform duration-300 pointer-events-none" style={{ width: '800px', height: '1131px' }}>
                  <InvoiceDocument invoice={buildInvoiceObject()} company={company} />
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

