# 🌍 Next Country

A modern country finder application built using Next.js that allows users to browse, search, and explore countries around the world with a fast and responsive interface.

The application integrates with the [REST Countries API](https://restcountries.com) and includes dedicated country detail pages, dark mode support, and reusable UI components.

---

# 🧰 Tech Stack

## Frontend

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Query (React Query)
- Lucide Icons

## API

- REST Countries API

---

# 📁 Project Structure

```txt
next-country/
│
├── app/
│   ├── countries/
│   │   └── [id]/
│   ├── globals.css
│   └── layout.tsx
│
├── components/
│
├── hooks/
│
├── lib/
│
├── public/
│
├── types/
│
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## Sample Images



---

# ⚙️ Local Setup

## 1. Clone Repository

```bash
git clone <your-repository-url>
cd next-country
```

---

## 2. Install Dependencies

Using npm:

```bash
npm install
```

Using yarn:

```bash
yarn install
```

Using pnpm:

```bash
pnpm install
```

---

## 3. Run Development Server

```bash
npm run dev
```

Application will start on:

```bash
http://localhost:3000
```

---

# 🚀 Features

- 🌎 Browse countries around the world
- 🔍 Search countries
- 📄 Dynamic country detail page using country ID/code
- 🌙 Dark theme support
- ⚡ Fast and responsive UI
- 📱 Mobile-friendly layout
- 🧩 Reusable UI components with shadcn/ui
- 🔄 Data fetching with React Query
- 🖼️ Optimized image loading with Next.js Image component

---

# 📡 API Used

This project uses the REST Countries API.

Base endpoint:

```txt
https://restcountries.com/v3.1/all
```

Example fields endpoint:

```txt
https://restcountries.com/v3.1/all?fields=cca3,name,flags,population,region,capital
```

---

# 🎨 Styling

This project uses:

- Tailwind CSS for utility-first styling
- shadcn/ui for reusable accessible UI components
- Responsive grid layouts and skeleton loaders

---

# 🌙 Dark Mode

Dark mode support is implemented using Tailwind CSS dark classes and theme configuration.

---

# 📦 Data Fetching

Country data is fetched using:

- TanStack Query (React Query)
- REST Countries API
- Custom reusable hooks

Example hooks:

- `useCountries`
- `useCountryByCode`
- `useCountriesByCodes`