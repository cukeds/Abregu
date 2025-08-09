"use client";
import { useRouter } from "next/navigation";

// Replace the placeholders with your real letter + activities text
const LETTER = `Queremos agradecerte por confiar en este proceso. ...`;
const ACTIVITIES = [
  { id: 'act1', label: 'Actividad 1 (libre)', placeholder: 'Escribe aquí...', preset: 'Estoy orgullos@ de haber dado este paso.' },
  { id: 'act2', label: 'Actividad 2 (libre)', placeholder: 'Escribe aquí...', preset: 'Hoy me comprometo a ser amable conmigo.' },
];

export default function Agradecimiento() {
  const router = useRouter();

  const next = () => router.push('/compromiso');

  return (
    <main style={{ padding: 20 }}>
      <h2 style={{ fontSize: 22, marginBottom: 12 }}>Carta de Agradecimiento</h2>
      <p style={{ whiteSpace: 'pre-wrap', color: '#444' }}>{LETTER}</p>

      <h3 style={{ marginTop: 16 }}>Actividades</h3>
      <div style={{ display: 'grid', gap: 10, marginTop: 8 }}>
        {ACTIVITIES.map(a => (
          <div key={a.id}>
            <label style={{ fontSize: 13, color: '#666' }}>{a.label}</label>
            <textarea defaultValue={a.preset} placeholder={a.placeholder} style={ta} rows={4} />
          </div>
        ))}
      </div>

      <button onClick={next} style={{ ...btn, marginTop: 16 }}>Siguiente</button>
    </main>
  );
}

const ta: React.CSSProperties = { width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 10 };
const btn: React.CSSProperties = { padding: '12px 14px', borderRadius: 10, border: '1px solid #333', background: '#111', color: 'white', width: '100%' };