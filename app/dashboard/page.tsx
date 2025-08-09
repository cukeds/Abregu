"use client";
import Link from 'next/link';
import { colors } from '@/lib/theme';
import Header from '@/components/Header';

/**
 * Home page after login with links to key sections. Uses a top header.
 */
export default function Dashboard() {
  const card: React.CSSProperties = {
    padding: 16,
    border: `1px solid ${colors.primary}`,
    borderRadius: 12,
    background: colors.accent,
    textDecoration: 'none',
    color: colors.primary,
    fontWeight: 600,
    display: 'block'
  };
  return (
    <>
      <Header title="Inicio" showBack={false} showHome={false} />
      <main style={{ padding: 20, minHeight: 'calc(100dvh - 48px)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'grid', gap: 12, flex: 1 }}>
          <Link href="/competencias" style={card}>🏆 Competencias</Link>
          <Link href="/agenda" style={card}>🗓️ Agenda</Link>
          <Link href="/evaluaciones" style={card}>🧠 Evaluaciones</Link>
        </div>
      </main>
    </>
  );
}