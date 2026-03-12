'use client';
import { useEffect, useState, useRef } from 'react';
import Sidebar from '@/components/Sidebar';
import { storage } from '@/lib/storage';
import { CompanyInfo } from '@/types';
import { Save, Upload, X, Building2 } from 'lucide-react';

const defaultCompany = (): CompanyInfo => ({
  name: '', email: '', phone: '', address: '', city: '', country: '',
  taxId: '', logo: undefined, website: '', bankAccount: '', iban: '',
});

export default function SettingsPage() {
  const [company, setCompany] = useState<CompanyInfo>(defaultCompany());
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = storage.getCompany();
    if (stored) setCompany(stored);
  }, []);

  const handleSave = () => {
    storage.saveCompany(company);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setCompany(prev => ({ ...prev, logo: ev.target?.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const set = (field: keyof CompanyInfo, value: string) =>
    setCompany(prev => ({ ...prev, [field]: value }));

  return (
    <div className="flex min-h-screen bg-[#0e0d14]">
      <Sidebar />
      <main className="flex-1 ml-60 p-10 animate-fade-in">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-zinc-100" style={{ fontFamily: 'var(--font-poppins)' }}>
              Company Settings
            </h1>
            <p className="text-zinc-400 text-sm mt-1">This info will appear on all your invoices</p>
          </div>
          <button onClick={handleSave} className="btn-primary">
            <Save className="w-4 h-4" />
            {saved ? 'Saved!' : 'Save Settings'}
          </button>
        </div>

        <div className="max-w-2xl space-y-6">
          {/* Logo Upload */}
          <div className="card p-6 border-white/5">
            <h2 className="font-semibold text-zinc-100 mb-5">Company Logo</h2>
            <div className="flex items-center gap-5">
              <div className="w-24 h-24 rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden bg-[#1a1b26]">
                {company.logo ? (
                  <img src={company.logo} alt="Logo" className="w-full h-full object-contain" />
                ) : (
                  <Building2 className="w-8 h-8 text-zinc-600" />
                )}
              </div>
              <div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoUpload}
                />
                <button onClick={() => fileRef.current?.click()} className="btn-secondary">
                  <Upload className="w-4 h-4" /> Upload Logo
                </button>
                {company.logo && (
                  <button
                    onClick={() => setCompany(prev => ({ ...prev, logo: undefined }))}
                    className="btn-danger ml-2"
                  >
                    <X className="w-4 h-4" /> Remove
                  </button>
                )}
                <p className="text-zinc-500 text-xs mt-2">PNG, JPG or SVG. Max 2MB.</p>
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div className="card p-6 border-white/5">
            <h2 className="font-semibold text-zinc-100 mb-5">Company Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="label">Company Name *</label>
                <input className="input" placeholder="My Company LLC" value={company.name} onChange={e => set('name', e.target.value)} />
              </div>
              <div>
                <label className="label">Email</label>
                <input type="email" className="input" placeholder="hello@mycompany.com" value={company.email} onChange={e => set('email', e.target.value)} />
              </div>
              <div>
                <label className="label">Phone</label>
                <input className="input" placeholder="+212 6XX XXX XXX" value={company.phone || ''} onChange={e => set('phone', e.target.value)} />
              </div>
              <div>
                <label className="label">Website</label>
                <input className="input" placeholder="https://mycompany.com" value={company.website || ''} onChange={e => set('website', e.target.value)} />
              </div>
              <div>
                <label className="label">Tax ID / ICE / RC</label>
                <input className="input" placeholder="Tax identifier" value={company.taxId || ''} onChange={e => set('taxId', e.target.value)} />
              </div>
              <div className="col-span-2">
                <label className="label">Address</label>
                <input className="input" placeholder="123 Boulevard Mohammed V" value={company.address} onChange={e => set('address', e.target.value)} />
              </div>
              <div>
                <label className="label">City</label>
                <input className="input" placeholder="Casablanca" value={company.city} onChange={e => set('city', e.target.value)} />
              </div>
              <div>
                <label className="label">Country</label>
                <input className="input" placeholder="Morocco" value={company.country} onChange={e => set('country', e.target.value)} />
              </div>
            </div>
          </div>

          {/* Bank Info */}
          <div className="card p-6 border-white/5">
            <h2 className="font-semibold text-zinc-100 mb-1">Payment Information</h2>
            <p className="text-zinc-500 text-xs mb-5">Shown at the bottom of every invoice</p>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="label">Bank Account / RIB</label>
                <input className="input" placeholder="Bank name – Account number" value={company.bankAccount || ''} onChange={e => set('bankAccount', e.target.value)} />
              </div>
              <div>
                <label className="label">IBAN</label>
                <input className="input" placeholder="MA64 XXXX XXXX XXXX XXXX XXXX XXXX" value={company.iban || ''} onChange={e => set('iban', e.target.value)} />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button onClick={handleSave} className="btn-primary">
              <Save className="w-4 h-4" />
              {saved ? '✓ Saved!' : 'Save Settings'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
