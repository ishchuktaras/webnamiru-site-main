// components/admin/AdminTheme.tsx

"use client";

import { useEffect } from 'react';

export default function AdminTheme() {
  useEffect(() => {
    // Když se komponenta načte, přidá třídu 'dark' na <html>
    document.documentElement.classList.add('dark');

    // Když komponenta zmizí (při odchodu z adminu), třídu zase odebere
    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, []); // Prázdné pole znamená, že se efekt spustí jen jednou při načtení

  return null; // Komponenta sama o sobě nic nevykresluje
}