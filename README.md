# 🧾 InvoiceFlow — Professional Invoice Generator

A clean, minimal invoice generator built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

## ✨ Features

- **📄 Invoice Management** — Create, edit, view, and delete invoices
- **👥 Client Management** — Store and manage your clients
- **🏢 Company Branding** — Upload your logo, add company info
- **🧮 Tax Calculator** — Per-item tax rates (0%, 5%, 7%, 10%, 14%, 20%)
- **💱 Multi-Currency** — USD, EUR, GBP, MAD, AED, SAR, and more
- **🖨️ PDF Export** — Print-to-PDF via browser (Ctrl+P / Cmd+P)
- **💾 Local Storage** — All data persists in the browser
- **📊 Dashboard** — Revenue overview, invoice stats, recent activity

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
invoice-generator/
├── app/
│   ├── page.tsx              # Dashboard
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── clients/
│   │   └── page.tsx          # Client management
│   ├── invoices/
│   │   ├── page.tsx          # Invoice list
│   │   └── [id]/
│   │       ├── page.tsx      # Invoice detail / print
│   │       └── edit/
│   │           └── page.tsx  # Edit invoice
│   ├── new-invoice/
│   │   └── page.tsx          # Create invoice
│   └── settings/
│       └── page.tsx          # Company settings
├── components/
│   └── Sidebar.tsx           # Navigation
├── lib/
│   ├── storage.ts            # LocalStorage CRUD
│   └── calculations.ts       # Tax & total logic
├── types/
│   └── index.ts              # TypeScript types
└── package.json
```

## 🖨️ Exporting to PDF

1. Open any invoice (click on it from the list)
2. Click **Print / PDF** button
3. In the browser print dialog, choose **Save as PDF**
4. Done! 

## 💡 Tips

- **First steps**: Go to **Settings** → add your company info & logo
- **Add a client**: Go to **Clients** → Add Client
- **New invoice**: Go to **New Invoice** → select client, add items, save
- **Tax rates**: Set per-line-item (0%, 5%, 7%, 10%, 14%, 20%)
- **Discount**: Applied at invoice level (percentage)

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Playfair Display + Inter (Google Fonts)
- **Icons**: Lucide React
- **Dates**: date-fns
- **Storage**: Browser LocalStorage

## 📦 Dependencies

```json
{
  "next": "14.x",
  "react": "18.x",
  "lucide-react": "latest",
  "date-fns": "latest",
  "uuid": "latest",
  "tailwindcss": "3.x"
}
```
