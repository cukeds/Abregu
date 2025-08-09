import Link from "next/link";
import { colors } from "@/lib/theme";

export default function Dashboard() {
  const card: React.CSSProperties = {
    padding: 16,
    border: `1px solid ${colors.primary}`,
    borderRadius: 12,
    background: colors.accent,
    textDecoration: "none",
    color: colors.primary,
    fontWeight: 600,
    display: "block"
  };
  return (
    <main style={{ padding: 20, display: "grid", gap: 12 }}>
      <h2 style={{ fontSize: 24, marginBottom: 8, color: colors.primary }}>Inicio</h2>
      <Link href="/competencias" style={card}>🏆 Competencias</Link>
      <Link href="/agenda" style={card}>🗓️ Agenda</Link>
      <Link href="/evaluaciones" style={card}>🧠 Evaluaciones</Link>
    </main>
  );
}
