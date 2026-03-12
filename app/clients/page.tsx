'use client';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { storage } from '@/lib/storage';
import { Client } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Trash2, Edit2, Users, X, Save } from 'lucide-react';

const emptyClient = (): Omit<Client, 'id' | 'createdAt'> => ({
  name: '', email: '', phone: '', address: '', city: '', country: '', taxId: '',
});

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyClient());

  useEffect(() => { setClients(storage.getClients()); }, []);

  const handleSubmit = () => {
    if (!form.name || !form.email) { alert('Name and email are required.'); return; }

    if (editingId) {
      const updated: Client = { ...form, id: editingId, createdAt: clients.find(c => c.id === editingId)!.createdAt };
      storage.updateClient(updated);
    } else {
      const client: Client = { ...form, id: uuidv4(), createdAt: new Date().toISOString() };
      storage.addClient(client);
    }

    setClients(storage.getClients());
    setShowForm(false);
    setEditingId(null);
    setForm(emptyClient());
  };

  const handleEdit = (client: Client) => {
    setForm({ name: client.name, email: client.email, phone: client.phone || '', address: client.address, city: client.city, country: client.country, taxId: client.taxId || '' });
    setEditingId(client.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Delete this client?')) return;
    storage.deleteClient(id);
    setClients(storage.getClients());
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyClient());
  };

  return (
    <div className="flex min-h-screen bg-[#0e0d14]">
      <Sidebar />
      <main className="flex-1 ml-60 p-10 animate-fade-in">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-zinc-100" style={{ fontFamily: 'var(--font-poppins)' }}>
              Clients
            </h1>
            <p className="text-zinc-400 text-sm mt-1">{clients.length} clients</p>
          </div>
          {!showForm && (
            <button onClick={() => setShowForm(true)} className="btn-primary">
              <Plus className="w-4 h-4" /> Add Client
            </button>
          )}
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="card p-6 mb-6 animate-slide-in border-white/5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-zinc-100">
                {editingId ? 'Edit Client' : 'New Client'}
              </h2>
              <button onClick={handleCancel} className="text-zinc-500 hover:text-zinc-300 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Full Name *</label>
                <input className="input" placeholder="Acme Corp" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label className="label">Email *</label>
                <input type="email" className="input" placeholder="contact@acme.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label className="label">Phone</label>
                <input className="input" placeholder="+1 234 567 890" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div>
                <label className="label">Tax ID / ICE</label>
                <input className="input" placeholder="Tax identifier" value={form.taxId} onChange={e => setForm({ ...form, taxId: e.target.value })} />
              </div>
              <div className="col-span-2">
                <label className="label">Address</label>
                <input className="input" placeholder="123 Main Street" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
              </div>
              <div>
                <label className="label">City</label>
                <input className="input" placeholder="Casablanca" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
              </div>
              <div>
                <label className="label">Country</label>
                <input className="input" placeholder="Morocco" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} />
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={handleSubmit} className="btn-primary">
                <Save className="w-4 h-4" /> {editingId ? 'Update Client' : 'Save Client'}
              </button>
              <button onClick={handleCancel} className="btn-secondary">Cancel</button>
            </div>
          </div>
        )}

        {/* Clients Grid */}
        {clients.length === 0 ? (
          <div className="card p-12 text-center border-white/5">
            <Users className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
            <p className="text-zinc-400 font-medium">No clients yet</p>
            <p className="text-zinc-500 text-sm mt-1">Add your first client to start creating invoices</p>
            <button onClick={() => setShowForm(true)} className="btn-primary mt-4 mx-auto">
              <Plus className="w-4 h-4" /> Add Client
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {clients.map(client => (
              <div key={client.id} className="card p-5 group hover:border-zinc-700 transition-colors border-white/5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-[#1a1b26] rounded-xl flex items-center justify-center text-zinc-300 font-semibold text-sm">
                    {client.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEdit(client)} className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-500 hover:text-zinc-300 transition-colors">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDelete(client.id)} className="p-1.5 rounded-lg hover:bg-red-900/30 text-zinc-500 hover:text-red-400 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="font-semibold text-zinc-100 text-sm">{client.name}</p>
                <p className="text-zinc-400 text-xs mt-0.5">{client.email}</p>
                {client.phone && <p className="text-zinc-500 text-xs mt-1">{client.phone}</p>}
                <p className="text-zinc-500 text-xs mt-2">{client.city}, {client.country}</p>
                {client.taxId && <p className="text-zinc-500 text-xs">Tax: {client.taxId}</p>}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
