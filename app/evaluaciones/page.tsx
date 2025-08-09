"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { listEvaluaciones, type Evaluacion } from '@/lib/store';
import { btn, btnGhost, colors } from '@/lib/theme';
import Header from '@/components/Header';

/**
 * Evaluaciones list page.  Shows the user's past competition evaluations and actions to create
 * a new one or view the conversation with the psychologist.  Uses the shared Header component
 * and compact buttons for a mobile‑friendly layout.
 */
export default function EvaluacionesList() {
  const [items, setItems] = useState<Evaluacion[]>([]);
  useEffect(() => setItems(listEvaluaciones()), []);
  return (
    <>
      <Header title="Evaluaciones" />
      <main
        style={{
          padding: 20,
          minHeight: 'calc(100dvh - 48px)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <Link
            href="/evaluaciones/new"
            style={{ ...btn, borderRadius: 999, padding: '8px 14px', fontSize: 14 }}
          >
            + Nueva evaluación
          </Link>
          <Link
            href="/evaluaciones/chat"
            style={{ ...btnGhost, borderRadius: 999, padding: '8px 14px', fontSize: 14 }}
          >
            Chat
          </Link>
        </div>
        <h2 style={{ fontSize: 20, marginBottom: 8, color: colors.primary }}>Mis evaluaciones</h2>
        {items.length === 0 && (
          <p style={{ color: '#777', flex: 1 }}>Aún no realizaste evaluaciones de competencias.</p>
        )}
        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 10, flex: 1 }}>
          {items.map((ev) => (
            <li
              key={ev.id}
              style={{ border: `1px solid ${colors.secondary}`, borderRadius: 12, padding: 12 }}
            >
              <div style={{ fontWeight: 600, color: colors.primary }}>{ev.competenciaTitle || 'Competencia'}</div>
              <div style={{ fontSize: 12, color: '#666' }}>{new Date(ev.fecha).toLocaleDateString()}</div>
              <div style={{ marginTop: 4 }}>{ev.resultado}</div>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}