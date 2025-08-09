"use client";
import { useEffect, useState } from "react";
import { listCompetencias, Competencia } from "@/lib/store";

export default function Mine() {
  const [items, setItems] = useState<Competencia[]>([]);
  useEffect(() => setItems(listCompetencias()), []);
  return (
    <main style={{ padding: 20 }}>
      <h2 style={{ fontSize: 22, marginBottom: 12 }}>Mis competencias</h2>
      {items.length===0 && <p style={{ color: '#777' }}>Aún no creaste competencias.</p>}
      <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 10 }}>
        {items.map(c => (
          <li key={c.id} style={{ border: '1px solid #eee', borderRadius: 12, padding: 12 }}>
            <div style={{ fontWeight: 600 }}>{c.title}</div>
            <div style={{ color: '#666', fontSize: 13 }}>{new Date(c.date).toLocaleDateString()}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}