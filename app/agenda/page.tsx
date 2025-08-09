"use client";
import { listCompetencias, type Competencia } from '@/lib/store';
import { useEffect, useState } from 'react';
import { colors } from '@/lib/theme';
import Header from '@/components/Header';

/**
 * Timeline of upcoming competitions. Each entry shows a coloured bar and the date/title.
 * A bottom nav provides easy navigation across sections.
 */
export default function Agenda() {
  const [items, setItems] = useState<Competencia[]>([]);
  useEffect(() => setItems(listCompetencias().sort((a, b) => a.date.localeCompare(b.date))), []);
  return (
    <>
      <Header title="Agenda" />
      <main style={{ padding: 20, minHeight: 'calc(100dvh - 48px)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'grid', gap: 12, flex: 1 }}>
        {items.map((c) => (
          <div
            key={c.id}
            style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 12, alignItems: 'start' }}
          >
            <div
              style={{ width: 6, background: colors.primary, borderRadius: 3, height: '100%', marginTop: 6 }}
            />
            <div>
              <div style={{ fontWeight: 600, color: colors.primary }}>
                {new Date(c.date).toLocaleDateString()}
              </div>
              <div>{c.title}</div>
            </div>
          </div>
        ))}
        {items.length === 0 && <p style={{ color: '#777' }}>Sin eventos por ahora.</p>}
        </div>
      </main>
    </>
  );
}