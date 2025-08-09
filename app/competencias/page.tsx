"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { listCompetencias, Competencia } from "@/lib/store";

export default function Competencias() {
  const [items, setItems] = useState<Competencia[]>([]);
  useEffect(() => setItems(listCompetencias()), []);

  return (
    <main style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h2 style={{ fontSize: 22 }}>Competencias</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link href="/competencias/new" style={btn}>+ Crear</Link>
          <Link href="/competencias/mine" style={btn}>Mis competencias</Link>
        </div>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 10 }}>
        {items.length === 0 && <li style={{ color: '#777' }}>No hay competencias próximas.</li>}
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

const btn: React.CSSProperties = { padding: '8px 12px', border: '1px solid #ddd', borderRadius: 10, textDecoration: 'none' };