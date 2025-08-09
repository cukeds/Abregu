"use client";
import { useRouter } from 'next/navigation';
import { input, btn, colors } from '@/lib/theme';
import Header from '@/components/Header';

// A letter template with blanks to fill
const TEMPLATE = `Yo, {nombre}, me comprometo a {habito} durante {periodo}. Me recordaré que {mantra}. Fecha: {fecha}.`;

/**
 * Compromiso page allows the user to fill in a commitment letter.
 */
export default function Compromiso() {
  const router = useRouter();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // not persisted; demo-only
    router.push('/dashboard');
  };
  return (
    <>
      <Header title="Compromiso" />
      <form onSubmit={onSubmit} style={{ padding: 20, minHeight: 'calc(100dvh - 48px)', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: 24, marginBottom: 12, color: colors.primary }}>Compromiso con vos mism@</h2>
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
      <div style={{ padding: 12, border: '1px solid #eee', borderRadius: 10, color: '#444', fontSize: 14, marginBottom: 20 }}>
        {TEMPLATE.replace('{nombre}', 'Demo')
          .replace('{habito}', 'practicar 10 min de respiración')
          .replace('{periodo}', '7 días')
          .replace('{mantra}', 'soy paciente y constante')
          .replace('{fecha}', new Date().toISOString().slice(0, 10))}
      </div>
        {/* content end */}
      </form>
    </>
  );
}