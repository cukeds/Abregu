"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { listCompetencias, type Competencia } from "@/lib/store";
import { btn, colors } from "@/lib/theme";

export default function Competencias() {
  const [items, setItems] = useState<Competencia[]>([]);
  useEffect(() => setItems(listCompetencias()), []);
  return (
    <main style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h2 style={{ fontSize: 24, color: colors.primary }}>Competencias</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <Link href="/competencias/new" style={btn}>+ Crear</Link>
          <Link href="/competencias/mine" style={btn}>Mis competencias</Link>
        </div>
      </div>
      <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 10 }}>
        {items.length === 0 && <li style={{ color: "#777" }}>No hay competencias próximas.</li>}
        {items.map((c) => (
          <li key={c.id} style={{ border: `1px solid ${colors.secondary}`, borderRadius: 12, padding: 12 }}>
            <div style={{ fontWeight: 600, color: colors.primary }}>{c.title}</div>
            <div style={{ color: "#666", fontSize: 13 }}>{new Date(c.date).toLocaleDateString()}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
