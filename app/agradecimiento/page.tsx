"use client";
import { useRouter } from "next/navigation";
import { btn, ta, colors } from "@/lib/theme";

// Replace these with your real texts
const LETTER = `Queremos agradecerte por confiar en este proceso. ...`;
const ACTIVITIES = [
  { id: "act1", label: "Actividad 1 (libre)", placeholder: "Escribe aquí...", preset: "Estoy orgullos@ de haber dado este paso." },
  { id: "act2", label: "Actividad 2 (libre)", placeholder: "Escribe aquí...", preset: "Hoy me comprometo a ser amable conmigo." }
];

export default function Agradecimiento() {
  const router = useRouter();
  const next = () => router.push("/compromiso");

  return (
    <main style={{ padding: 20 }}>
      <h2 style={{ fontSize: 24, marginBottom: 12, color: colors.primary }}>
        Carta de Agradecimiento
      </h2>
      <p style={{ whiteSpace: "pre-wrap", color: "#333" }}>{LETTER}</p>

      <h3 style={{ marginTop: 16, color: colors.primary }}>Actividades</h3>
      <div style={{ display: "grid", gap: 10, marginTop: 8 }}>
        {ACTIVITIES.map((a) => (
          <div key={a.id}>
            <label style={{ fontSize: 14, color: colors.primary }}>{a.label}</label>
            <textarea defaultValue={a.preset} placeholder={a.placeholder} style={ta} rows={4} />
          </div>
        ))}
      </div>

      <button onClick={next} style={{ ...btn, marginTop: 16 }}>
        Siguiente
      </button>
    </main>
  );
}
