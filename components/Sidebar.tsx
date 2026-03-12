'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Menu,
  ReceiptText,
  FileText,
  Users,
  PlusCircle,
  Settings,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/invoices', label: 'Invoices', icon: FileText },
  { href: '/clients', label: 'Clients', icon: Users },
  { href: '/new-invoice', label: 'New Invoice', icon: PlusCircle },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 min-h-screen bg-[#0E0D14] flex flex-col py-6 px-4 fixed top-0 left-0 z-30">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-3 mb-8">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#a78bfa] flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.3)]">
          <ReceiptText className="w-4 h-4 text-[#eadeff]" />
        </div>
        <div>
          <p className="font-bold text-zinc-100 text-sm leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
            InvoiceFlow
          </p>
          <p className="text-zinc-500 text-xs">Professional</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href !== '/dashboard' && href !== '/' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`sidebar-link ${isActive ? 'active' : ''}`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom hint */}
      <div className="mt-auto px-3 py-3 bg-[#13121A] rounded-xl">
        <p className="text-xs text-zinc-500 leading-relaxed">
          💡 Tip: Upload your company logo in{' '}
          <Link href="/settings" className="text-zinc-300 hover:text-white transition-colors">Settings</Link>
        </p>
      </div>
    </aside>
  );
}
