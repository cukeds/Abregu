import Link from "next/link";

export default function Dashboard() {
  const card = { padding: 16, border: '1px solid #eee', borderRadius: 12, background: '#fafafa', textDecoration: 'none', color: 'inherit' } as const;
  return (
    <main style={{ padding: 20, display: 'grid', gap: 12 }}>
      <h2 style={{ fontSize: 22, marginBottom: 8 }}>Inicio</h2>
      <Link href="/competencias" style={card}>🏆 Competencias</Link>
      <Link href="/agenda" style={card}>🗓️ Agenda</Link>
      <Link href="/evaluaciones" style={card}>🧠 Evaluaciones</Link>
    </main>
  );
}