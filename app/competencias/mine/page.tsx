"use client";
import { useEffect, useState } from 'react';
import { listCompetencias, type Competencia } from '@/lib/store';
import { colors } from '@/lib/theme';
import Header from '@/components/Header';

/**
 * Shows the competitions created by the current user. Uses the same
 * styling as the main competitions list. Navigation is displayed at the bottom.
 */
export default function Mine() {
  const [items, setItems] = useState<Competencia[]>([]);
  useEffect(() => setItems(listCompetencias()), []);
  return (
    <>
      <Header title="Mis competencias" />
      <main style={{ padding: 20, minHeight: 'calc(100dvh - 48px)', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: 24, marginBottom: 12, color: colors.primary }}>Mis competencias</h2>
      {items.length === 0 && <p style={{ color: '#777' }}>Aún no creaste competencias.</p>}
      <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 10, flex: 1 }}>
        {items.map((c) => (
          <li
            key={c.id}
            style={{ border: `1px solid ${colors.secondary}`, borderRadius: 12, padding: 12 }}
          >
            <div style={{ fontWeight: 600, color: colors.primary }}>{c.title}</div>
            <div style={{ color: '#666', fontSize: 13 }}>{new Date(c.date).toLocaleDateString()}</div>
          </li>
        ))}
      </ul>
      </main>
    </>
  );
}