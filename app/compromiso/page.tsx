"use client";
import { useRouter } from "next/navigation";

// A letter template with blanks to fill
const TEMPLATE = `Yo, {nombre}, me comprometo a {habito} durante {periodo}. Me recordaré que {mantra}. Fecha: {fecha}.`;

export default function Compromiso() {
  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    // not persisted; demo-only
    router.push('/dashboard');
  };

  return (
    <form onSubmit={onSubmit} style={{ padding: 20 }}>
      <h2 style={{ fontSize: 22, marginBottom: 12 }}>Compromiso con vos mism@</h2>
      <p style={{ color: '#666', marginBottom: 8 }}>Completa los campos para generar tu carta.</p>

      <div style={{ display: 'grid', gap: 10 }}>
        <input required name="nombre" placeholder="Tu nombre" style={input} defaultValue="Demo" />
        <input required name="habito" placeholder="Hábito (p. ej., escribir 5 min)" style={input} defaultValue="practicar 10 min de respiración" />
        <input required name="periodo" placeholder="Periodo (p. ej., 7 días)" style={input} defaultValue="7 días" />
        <input required name="mantra" placeholder="Mantra" style={input} defaultValue="soy paciente y constante" />
        <input required name="fecha" type="date" style={input} />
      </div>

      <button type="submit" style={{ ...btn, marginTop: 14 }}>Continuar</button>

      <p style={{ fontSize: 12, color: '#888', marginTop: 12 }}>Previsualización:</p>
      <div style={{ padding: 12, border: '1px solid #eee', borderRadius: 10, color: '#444', fontSize: 14 }}>
        {TEMPLATE.replace('{nombre}', 'Demo')
          .replace('{habito}', 'practicar 10 min de respiración')
          .replace('{periodo}', '7 días')
          .replace('{mantra}', 'soy paciente y constante')
          .replace('{fecha}', new Date().toISOString().slice(0,10))}
      </div>
    </form>
  );
}

const input: React.CSSProperties = { padding: '12px 14px', borderRadius: 10, border: '1px solid #ddd' };
const btn: React.CSSProperties = { padding: '12px 14px', borderRadius: 10, border: '1px solid #333', background: '#111', color: 'white', width: '100%' };