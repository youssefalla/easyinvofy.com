import { Invoice, CompanyInfo, CURRENCIES } from '@/types';
import { calculateInvoiceTotals, calculateItemSubtotal, calculateItemTax, formatCurrency } from '@/lib/calculations';
import { format } from 'date-fns';

interface InvoiceDocumentProps {
  invoice: Invoice;
  company: CompanyInfo | null;
}

export default function InvoiceDocument({ invoice, company }: InvoiceDocumentProps) {
  const { subtotal, totalTax, discountAmount, total } = calculateInvoiceTotals(invoice.items, invoice.discount);
  const currency = CURRENCIES.find(c => c.code === invoice.currency) || CURRENCIES[0];
  const fmt = (n: number) => formatCurrency(n, currency.symbol);

  return (
    <div className="card w-full h-full min-h-[1131px] p-10 border-white/5 bg-[#16161e] print:min-h-0 print:shadow-none print:border-none print:p-0 print:bg-white" id="invoice-print">
      {/* Header */}
      <div className="flex justify-between items-start mb-10">
        <div>
          {company?.logo && (
            <img src={company.logo} alt="Logo" className="h-14 w-auto object-contain mb-3" />
          )}
          <h2 className="font-bold text-zinc-100 print:text-black text-lg">{company?.name || 'Your Company'}</h2>
          <p className="text-zinc-400 print:text-zinc-600 text-sm mt-1">{company?.address}</p>
          <p className="text-zinc-400 print:text-zinc-600 text-sm">{company?.city}, {company?.country}</p>
          {company?.email && <p className="text-zinc-400 print:text-zinc-600 text-sm">{company?.email}</p>}
          {company?.taxId && <p className="text-zinc-400 print:text-zinc-600 text-sm">Tax ID: {company?.taxId}</p>}
        </div>
        <div className="text-right">
          <h1 className="text-3xl font-bold text-zinc-100 print:text-black mb-1" style={{ fontFamily: 'var(--font-poppins)' }}>
            INVOICE
          </h1>
          <p className="text-zinc-500 print:text-zinc-600 text-sm font-medium">{invoice.invoiceNumber || 'DRAFT'}</p>
          <span className={`status-badge status-${invoice.status} mt-2 inline-flex print:border print:border-zinc-300 print:text-zinc-800 print:bg-transparent`}>
            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
          </span>
        </div>
      </div>

      {/* Dates + Client */}
      <div className="grid grid-cols-3 gap-6 mb-8 pb-8 border-b border-white/5 print:border-zinc-200">
        <div>
          <p className="label print:text-zinc-500">Bill To</p>
          {invoice.client ? (
            <>
              <p className="text-zinc-100 print:text-black font-semibold text-sm">{invoice.client.name}</p>
              <p className="text-zinc-400 print:text-zinc-600 text-sm">{invoice.client.email}</p>
              <p className="text-zinc-400 print:text-zinc-600 text-sm">{invoice.client.address}</p>
              <p className="text-zinc-400 print:text-zinc-600 text-sm">{invoice.client.city}, {invoice.client.country}</p>
              {invoice.client.taxId && <p className="text-zinc-400 print:text-zinc-600 text-sm">Tax ID: {invoice.client.taxId}</p>}
            </>
          ) : (
            <p className="text-zinc-500 italic text-sm">No client selected</p>
          )}
        </div>
        <div>
          <p className="label print:text-zinc-500">Issue Date</p>
          <p className="text-zinc-100 print:text-black text-sm font-medium">
            {invoice.issueDate ? format(new Date(invoice.issueDate), 'MMMM d, yyyy') : '-'}
          </p>
        </div>
        <div>
          <p className="label print:text-zinc-500">Due Date</p>
          <p className="text-zinc-100 print:text-black text-sm font-medium">
             {invoice.dueDate ? format(new Date(invoice.dueDate), 'MMMM d, yyyy') : '-'}
          </p>
        </div>
      </div>

      {/* Items Table */}
      <table className="w-full mb-6">
        <thead>
          <tr className="border-b border-white/10 print:border-zinc-300">
            <th className="text-left text-xs font-semibold text-zinc-500 print:text-zinc-600 uppercase tracking-wide pb-2">Description</th>
            <th className="text-right text-xs font-semibold text-zinc-500 print:text-zinc-600 uppercase tracking-wide pb-2">Qty</th>
            <th className="text-right text-xs font-semibold text-zinc-500 print:text-zinc-600 uppercase tracking-wide pb-2">Unit Price</th>
            <th className="text-right text-xs font-semibold text-zinc-500 print:text-zinc-600 uppercase tracking-wide pb-2">Tax</th>
            <th className="text-right text-xs font-semibold text-zinc-500 print:text-zinc-600 uppercase tracking-wide pb-2">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 print:divide-zinc-200">
          {invoice.items.length > 0 ? invoice.items.map(item => (
            <tr key={item.id}>
              <td className="py-3 text-sm text-zinc-300 print:text-zinc-800">{item.description || <span className="text-zinc-600 italic">Item description...</span>}</td>
              <td className="py-3 text-sm text-zinc-400 print:text-zinc-600 text-right">{item.quantity}</td>
              <td className="py-3 text-sm text-zinc-400 print:text-zinc-600 text-right">{fmt(item.unitPrice)}</td>
              <td className="py-3 text-sm text-zinc-400 print:text-zinc-600 text-right">{item.taxRate}%</td>
              <td className="py-3 text-sm font-medium text-zinc-100 print:text-black text-right">
                {fmt(calculateItemSubtotal(item) + calculateItemTax(item))}
              </td>
            </tr>
          )) : (
            <tr>
               <td className="py-3 text-sm text-zinc-500 italic text-center" colSpan={5}>No line items added</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-56 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400 print:text-zinc-600">Subtotal</span>
            <span className="text-zinc-100 print:text-black">{fmt(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400 print:text-zinc-600">Tax</span>
            <span className="text-zinc-100 print:text-black">{fmt(totalTax)}</span>
          </div>
          {discountAmount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400 print:text-zinc-600">Discount ({invoice.discount || 0}%)</span>
              <span className="text-red-400 print:text-red-500">-{fmt(discountAmount)}</span>
            </div>
          )}
          <div className="flex justify-between text-base font-bold text-zinc-100 print:text-black pt-2 border-t border-white/10 print:border-zinc-300">
            <span>Total</span>
            <span>{fmt(total)}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {invoice.notes && (
        <div className="border-t border-white/5 print:border-zinc-200 pt-6">
          <p className="label print:text-zinc-500">Notes</p>
          <p className="text-zinc-400 print:text-zinc-700 text-sm leading-relaxed whitespace-pre-wrap">{invoice.notes}</p>
        </div>
      )}

      {/* Bank Info */}
      {company?.bankAccount && (
        <div className="mt-6 pt-6 border-t border-white/5 print:border-zinc-200">
          <p className="label print:text-zinc-500">Payment Information</p>
          <p className="text-zinc-400 print:text-zinc-700 text-sm">{company.bankAccount}</p>
          {company.iban && <p className="text-zinc-400 print:text-zinc-700 text-sm">IBAN: {company.iban}</p>}
        </div>
      )}
    </div>
  );
}
