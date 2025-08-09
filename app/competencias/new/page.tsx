"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createCompetencia } from "@/lib/store";
import {colors} from "@/lib/theme";

export default function NewCompetencia() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Step 1
  const [title, setTitle] = useState("Copa Demo");
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0,10));
  const [objGeneral, setObjGeneral] = useState("Disfrutar y aprender");

  // Step 2 (max 3 each, max 20 chars each)
  const mk = () => [{ id: () => `${Date.now()}-${Math.floor(Math.random() * 1e6)}`, text: "" }];
  const [tec, setTec] = useState(mk());
  const [tac, setTac] = useState(mk());
  const [fis, setFis] = useState(mk());
  const [psi, setPsi] = useState(mk());

  const add = (list: any[], setList: any) => list.length < 3 && setList([...list, { id: Date.now().toString(), text: "" }]);
  const chg = (list: any[], setList: any, id: string, val: string) => setList(list.map(i => i.id===id? { ...i, text: val.slice(0,20) }: i));

  // Step 3
  const [pre, setPre] = useState("");
  const [notas, setNotas] = useState("");

  const save = () => {
    createCompetencia({
      title, date, objGeneral,
      objetivos: { tecnicos: tec.map(i=>i.text).filter(Boolean), tacticos: tac.map(i=>i.text).filter(Boolean), fisicos: fis.map(i=>i.text).filter(Boolean), psicologicos: psi.map(i=>i.text).filter(Boolean) },
      preCompetencia: pre, aTenerEnCuenta: notas,
    });
    router.replace('/competencias');
  };

  return (
    <main style={{ padding: 20 }}>
      <h2 style={{ fontSize: 22, marginBottom: 10 }}>Nueva Competencia</h2>
      <div style={{ color: '#666', fontSize: 13, marginBottom: 10 }}>Paso {step} de 3</div>

      {step===1 && (
        <div style={{ display: 'grid', gap: 10 }}>
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Título" style={input} />
          <input value={date} onChange={e=>setDate(e.target.value)} type="date" style={input} />
          <textarea value={objGeneral} onChange={e=>setObjGeneral(e.target.value)} placeholder="Objetivo general" style={ta} rows={4} />
          <button onClick={()=>setStep(2)} style={btn}>Siguiente</button>
        </div>
      )}

      {step===2 && (
        <div style={{ display: 'grid', gap: 16 }}>
          <Group title="Objetivos Técnicos" list={tec} setList={setTec} add={add} chg={chg} />
          <Group title="Objetivos Tácticos" list={tac} setList={setTac} add={add} chg={chg} />
          <Group title="Objetivos Físicos" list={fis} setList={setFis} add={add} chg={chg} />
          <Group title="Objetivos Psicológicos" list={psi} setList={setPsi} add={add} chg={chg} />
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={()=>setStep(1)} style={btnGhost}>Atrás</button>
            <button onClick={()=>setStep(3)} style={btn}>Siguiente</button>
          </div>
        </div>
      )}

      {step===3 && (
        <div style={{ display: 'grid', gap: 10 }}>
          <textarea value={pre} onChange={e=>setPre(e.target.value)} placeholder="PreCompetencia" style={ta} rows={4} />
          <textarea value={notas} onChange={e=>setNotas(e.target.value)} placeholder="A tener en cuenta" style={ta} rows={4} />
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={()=>setStep(2)} style={btnGhost}>Atrás</button>
            <button onClick={save} style={btn}>Guardar</button>
          </div>
        </div>
      )}
    </main>
  );
}

function Group({ title, list, setList, add, chg }: any) {
  return (
    <section>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <button onClick={()=>add(list, setList)} disabled={list.length>=3} style={chip}>+ Añadir</button>
      </div>
      <div style={{ display: 'grid', gap: 8 }}>
        {list.map((i: any)=> (
          <input key={i.id} value={i.text} onChange={e=>chg(list, setList, i.id, e.target.value)} placeholder="Máx 20 caracteres" style={input} />
        ))}
      </div>
    </section>
  );
}

const input: React.CSSProperties = { padding: '12px 14px', borderRadius: 10, border: '1px solid #ddd' };
const ta: React.CSSProperties = { width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 10 };
const btn: React.CSSProperties = { padding: '12px 14px', borderRadius: 10, border: '1px solid #333', background: colors.primary, color: colors.secondary, width: '100%' };
const btnGhost: React.CSSProperties = { padding: '12px 14px', borderRadius: 10, border: '1px solid #ddd', background: '#fff', width: '100%' };
const chip: React.CSSProperties = { padding: '6px 10px', borderRadius: 999, border: '1px solid #ddd', background: '#fff' };