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
  const [showPsych, setShowPsych] = useState(false);
  useEffect(() => setItems(listEvaluaciones()), []);
  const toggleView = () => setShowPsych(!showPsych);
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
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
          <Link
            href="/evaluaciones/new"
            style={{ ...btn, borderRadius: 999, padding: '6px 12px', fontSize: 13 }}
          >
            + Nueva evaluación
          </Link>
          <button
            onClick={toggleView}
            style={{ ...btnGhost, borderRadius: 999, padding: '6px 12px', fontSize: 13 }}
          >
            Cambiar vista
          </button>
          <Link
            href="/evaluaciones/chat"
            style={{ ...btnGhost, borderRadius: 999, padding: '6px 12px', fontSize: 13 }}
          >
            Chat
          </Link>
        </div>
        <h2 style={{ fontSize: 20, marginBottom: 8, color: colors.primary }}>
          {showPsych ? 'Vista psicólogo' : 'Mis evaluaciones'}
        </h2>
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
              {!showPsych ? (
                // Normal view: just show summary
                <div style={{ marginTop: 4 }}>{ev.resultado}</div>
              ) : (
                // Psychologist view: show detailed metrics and a chat button
                <div style={{ marginTop: 8, fontSize: 13 }}>
                  <div style={{ marginBottom: 6 }}>
                    <strong>Resultado:</strong> {ev.resultado || 'Sin resultado'}
                  </div>
                  <div style={{ marginBottom: 6 }}>
                    <strong>Niveles:</strong>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 4 }}>
                      {Object.keys(ev.niveles || {}).length === 0 && <li style={{ color: '#666' }}>—</li>}
                      {Object.entries(ev.niveles || {}).map(([k, v]) => (
                        <li key={k}>
                          {k}: {v}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ marginBottom: 6 }}>
                    <strong>Estados:</strong>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 4 }}>
                      {Object.keys(ev.estados || {}).length === 0 && <li style={{ color: '#666' }}>—</li>}
                      {Object.entries(ev.estados || {}).map(([k, v]) => (
                        <li key={k}>
                          {k}: {v}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ marginBottom: 6 }}>
                    <strong>Dedicación:</strong>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 4 }}>
                      <li>Técnicos: {ev.dedicacion?.tecnicos ?? 0}%</li>
                      <li>Tácticos: {ev.dedicacion?.tacticos ?? 0}%</li>
                      <li>Físicos: {ev.dedicacion?.fisicos ?? 0}%</li>
                      <li>Psicológicos: {ev.dedicacion?.psicologicos ?? 0}%</li>
                    </ul>
                  </div>
                  <div style={{ marginBottom: 6 }}>
                    <strong>Comentarios:</strong> <span style={{ color: '#666' }}>Sin comentarios</span>
                  </div>
                  <button
                    onClick={() => { /* no-op */ }}
                    style={{ ...btnGhost, borderRadius: 999, padding: '6px 12px', fontSize: 13 }}
                  >
                    Abrir chat
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}