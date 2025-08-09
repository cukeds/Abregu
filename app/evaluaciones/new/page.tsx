"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createEvaluacion } from "@/lib/store";

const NIVELS = ["Ansiedad", "Energía", "Confianza", "Enfoque"];
const ESTADOS = ["Flow", "Tensión", "Fatiga", "Motivación"];

export default function NewEval() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Page 1
  const [resultado, setResultado] = useState("");
  const [fecha, setFecha] = useState<string>(new Date().toISOString().slice(0,10));

  // Page 2/3
  const [niveles, setNiveles] = useState<Record<string, number>>(() => Object.fromEntries(NIVELS.map(n=>[n,5])));
  const [estados, setEstados] = useState<Record<string, number>>(() => Object.fromEntries(ESTADOS.map(n=>[n,5])));

  // Page 4
  const [tec, setTec] = useState(25);
  const [tac, setTac] = useState(25);
  const [fis, setFis] = useState(25);
  const [psi, setPsi] = useState(25);

  const save = () => {
    createEvaluacion({ resultado, fecha, niveles, estados, dedicacion: { tecnicos: tec, tacticos: tac, fisicos: fis, psicologicos: psi } });
    router.replace('/dashboard');
  };

  return (
    <main style={{ padding: 20 }}>
      <h2 style={{ fontSize: 22, marginBottom: 10 }}>Evaluación de Competencia</h2>
      <div style={{ color: '#666', fontSize: 13, marginBottom: 10 }}>Paso {step} de 4</div>

      {step===1 && (
        <div style={{ display: 'grid', gap: 10 }}>
          <textarea value={resultado} onChange={e=>setResultado(e.target.value)} placeholder="Resultado" style={ta} rows={4} />
          <input value={fecha} onChange={e=>setFecha(e.target.value)} type="date" style={input} />
          <button onClick={()=>setStep(2)} style={btn}>Siguiente</button>
        </div>
      )}

      {step===2 && (
        <section>
          <h3>Niveles emocionales (1-10)</h3>
          <ScaleList values={niveles} setValues={setNiveles} />
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <button onClick={()=>setStep(1)} style={btnGhost}>Atrás</button>
            <button onClick={()=>setStep(3)} style={btn}>Siguiente</button>
          </div>
        </section>
      )}

      {step===3 && (
        <section>
          <h3>Estados (1-10)</h3>
          <ScaleList values={estados} setValues={setEstados} />
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <button onClick={()=>setStep(2)} style={btnGhost}>Atrás</button>
            <button onClick={()=>setStep(4)} style={btn}>Siguiente</button>
          </div>
        </section>
      )}

      {step===4 && (
        <section style={{ display: 'grid', gap: 10 }}>
          <h3>Porcentaje de dedicación</h3>
          <Slider label="Técnicos" value={tec} setValue={setTec} />
          <Slider label="Tácticos" value={tac} setValue={setTac} />
          <Slider label="Físicos" value={fis} setValue={setFis} />
          <Slider label="Psicológicos" value={psi} setValue={setPsi} />
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <button onClick={()=>setStep(3)} style={btnGhost}>Atrás</button>
            <button onClick={save} style={btn}>Guardar</button>
          </div>
        </section>
      )}
    </main>
  );
}

function ScaleList({ values, setValues }:{ values: Record<string, number>, setValues: (v: any)=>void }) {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {Object.entries(values).map(([k,v])=> (
        <div key={k}>
          <label style={{ fontSize: 13 }}>{k}: {v}</label>
          <input type="range" min={1} max={10} value={v} onChange={e=>setValues({ ...values, [k]: Number(e.target.value) })} style={{ width: '100%' }} />
        </div>
      ))}
    </div>
  );
}

function Slider({ label, value, setValue }:{ label: string, value: number, setValue: (n:number)=>void }) {
  return (
    <div>
      <label style={{ fontSize: 13 }}>{label}: {value}%</label>
      <input type="range" min={0} max={100} value={value} onChange={e=>setValue(Number(e.target.value))} style={{ width: '100%' }} />
    </div>
  );
}

const input: React.CSSProperties = { padding: '12px 14px', borderRadius: 10, border: '1px solid #ddd' };
const ta: React.CSSProperties = { width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 10 };
const btn: React.CSSProperties = { padding: '12px 14px', borderRadius: 10, border: '1px solid #333', background: '#111', color: 'white', width: '100%' };
const btnGhost: React.CSSProperties = { padding: '12px 14px', borderRadius: 10, border: '1px solid #ddd', background: '#fff', width: '100%' };