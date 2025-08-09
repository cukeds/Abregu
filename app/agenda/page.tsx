"use client";
import { listCompetencias, Competencia } from "@/lib/store";
import { useEffect, useState } from "react";

export default function Agenda() {
  const [items, setItems] = useState<Competencia[]>([]);
  useEffect(()=> setItems(listCompetencias().sort((a,b)=> a.date.localeCompare(b.date))), []);

  return (
    <main style={{ padding: 20 }}>
      <h2 style={{ fontSize: 22, marginBottom: 12 }}>Agenda</h2>
      <div style={{ display: 'grid', gap: 12 }}>
        {items.map((c, idx)=> (
          <div key={c.id} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 12, alignItems: 'start' }}>
            <div style={{ width: 6, background: '#111', borderRadius: 3, height: '100%', marginTop: 6 }} />
            <div>
              <div style={{ fontWeight: 600 }}>{new Date(c.date).toLocaleDateString()}</div>
              <div>{c.title}</div>
            </div>
          </div>
        ))}
        {items.length===0 && <p style={{ color: '#777' }}>Sin eventos por ahora.</p>}
      </div>
    </main>
  );
}