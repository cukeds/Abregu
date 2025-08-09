"use client";
import { useRouter } from "next/navigation";
import { saveAuth } from "@/lib/store";
import { useState } from "react";

export default function AuthPage() {
  const [mode, setMode] = useState<'login'|'register'>('login');
  const router = useRouter();

  const continueFlow = () => {
    saveAuth({ user: { name: 'Demo' }, loggedIn: true });
    router.push('/agradecimiento');
  };

  return (
    <main style={{ padding: 20 }}>
      <h2 style={{ fontSize: 22, marginBottom: 16 }}>{mode === 'login' ? 'Ingresar' : 'Registrarse'}</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button onClick={() => setMode('login')} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #ddd', background: mode==='login'?'#eef':'#fff' }}>Login</button>
        <button onClick={() => setMode('register')} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #ddd', background: mode==='register'?'#eef':'#fff' }}>Registro</button>
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        <input placeholder="Email" style={input} />
        <input placeholder="Contraseña" type="password" style={input} />
        <button disabled style={{ ...btn, opacity: 0.7 }}>Continuar con Google (no activo)</button>
        <button onClick={continueFlow} style={btn}>Continuar</button>
      </div>
    </main>
  );
}

const input: React.CSSProperties = { padding: '12px 14px', borderRadius: 10, border: '1px solid #ddd' };
const btn: React.CSSProperties = { padding: '12px 14px', borderRadius: 10, border: '1px solid #333', background: '#111', color: 'white' };