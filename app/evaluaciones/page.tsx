export default function Evaluaciones() {
  const fakeThread = [
    { from: 'psico', text: '¿Cómo te sentiste antes de la competencia?' },
    { from: 'yo', text: 'Nervioso pero enfocado.' },
    { from: 'psico', text: 'Bien. Luego cargamos la evaluación cuando esté.' },
  ];

  return (
    <main style={{ padding: 20 }}>
      <h2 style={{ fontSize: 22, marginBottom: 12 }}>Evaluaciones</h2>
      <div style={{ display: 'grid', gap: 8 }}>
        {fakeThread.map((m, i)=> (
          <div key={i} style={{ justifySelf: m.from==='yo' ? 'end' : 'start', background: m.from==='yo'?'#111':'#eee', color: m.from==='yo'?'#fff':'#000', padding: '10px 12px', borderRadius: 12, maxWidth: '80%' }}>
            {m.text}
          </div>
        ))}
      </div>
      <p style={{ color: '#888', marginTop: 16, fontSize: 12 }}>* Conversación de ejemplo, no interactiva.</p>
    </main>
  );
}