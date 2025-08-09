"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { listCompetencias, type Competencia } from '@/lib/store';
import { btn, btnGhost, colors } from '@/lib/theme';
import Header from '@/components/Header';

/**
 * Shows the list of upcoming competitions and provides actions to create
 * a new competition or view the user's own competitions. Buttons are styled
 * as pill chips using the shared theme. Navigation is shown at the bottom.
 */
export default function Competencias() {
  const [items, setItems] = useState<Competencia[]>([]);
  useEffect(() => setItems(listCompetencias()), []);
  return (
    <>
      <Header title="Competencias" />
      <main style={{ padding: 20, minHeight: 'calc(100dvh - 48px)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div />
          {/* Title is handled by Header */}
          <div style={{ display: 'flex', gap: 8 }}>
            <Link
              href="/competencias/new"
              style={{
                ...btn,
                borderRadius: 999,
                padding: '6px 12px',
                fontSize: 13
              }}
            >
              + Crear
            </Link>
            <Link
              href="/competencias/mine"
              style={{
                ...btnGhost,
                borderRadius: 999,
                padding: '6px 12px',
                fontSize: 13
              }}
            >
              Mis competencias
            </Link>
          </div>
        </div>
        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 10, flex: 1 }}>
          {items.length === 0 && <li style={{ color: '#777' }}>No hay competencias próximas.</li>}
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