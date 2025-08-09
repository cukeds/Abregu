"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  listCompetencias,
  createEvaluacion,
  type Competencia
} from '@/lib/store';
import { btn, btnGhost, input, ta, colors } from '@/lib/theme';
import Header from '@/components/Header';

/**
 * Wizard page to create a new competition evaluation.  Guides the user through
 * selecting the competition, entering results, rating emotional levels and
 * states, and assigning dedication percentages.  Results are persisted via
 * localStorage using the store helper.
 */
export default function NewEvaluacion() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [competencias, setCompetencias] = useState<Competencia[]>([]);
  useEffect(() => setCompetencias(listCompetencias()), []);
  // Step 1: pick competition, result, date
  const [selectedComp, setSelectedComp] = useState<string>('');
  const [resultado, setResultado] = useState('');
  const [fecha, setFecha] = useState<string>(new Date().toISOString().slice(0, 10));
  // Step 2: emotional levels (niveles) 1–10
  const nivelesKeys = ['Motivación', 'Confianza', 'Ansiedad', 'Concentración'];
  const [niveles, setNiveles] = useState<Record<string, number>>({});
  // Step 3: emotional states (estados) 1–10
  const estadosKeys = ['Físico', 'Mental', 'Emocional', 'Social'];
  const [estados, setEstados] = useState<Record<string, number>>({});
  // Step 4: dedication percentages per area
  const [tec, setTec] = useState<number>(0);
  const [tac, setTac] = useState<number>(0);
  const [fis, setFis] = useState<number>(0);
  const [psi, setPsi] = useState<number>(0);

  // Initialise selected competition once options load
  useEffect(() => {
    if (!selectedComp && competencias.length > 0) {
      setSelectedComp(competencias[0].id);
    }
  }, [competencias, selectedComp]);

  const save = () => {
    const comp = competencias.find((c) => c.id === selectedComp);
    if (!comp) return;
    createEvaluacion({
      competenciaId: comp.id,
      competenciaTitle: comp.title,
      resultado,
      fecha,
      niveles,
      estados,
      dedicacion: {
        tecnicos: tec,
        tacticos: tac,
        fisicos: fis,
        psicologicos: psi
      }
    });
    router.replace('/evaluaciones');
  };

  // Render helper for 1–10 radio inputs
  const renderScale = (keys: string[], values: Record<string, number>, setValues: any) => {
    return keys.map((name) => (
      <div key={name} style={{ marginBottom: 12 }}>
        <div style={{ marginBottom: 4, color: colors.primary, fontWeight: 500 }}>{name}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <label key={n} style={{ fontSize: 12, textAlign: 'center', flex: 1 }}>
              <input
                type="radio"
                name={name}
                value={n}
                checked={values[name] === n}
                onChange={() => setValues({ ...values, [name]: n })}
                style={{ marginBottom: 4 }}
              />
              {n}
            </label>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <>
      <Header title="Nueva Evaluación" />
      <main
        style={{
          padding: 20,
          minHeight: 'calc(100dvh - 48px)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div style={{ color: '#666', fontSize: 13, marginBottom: 10 }}>Paso {step} de 4</div>
        {step === 1 && (
          <div style={{ display: 'grid', gap: 12 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 4, color: colors.primary }}>Competencia</label>
              {competencias.length === 0 ? (
                <p style={{ color: '#777' }}>Crea una competencia primero.</p>
              ) : (
                <select
                  value={selectedComp}
                  onChange={(e) => setSelectedComp(e.target.value)}
                  style={{ ...input, width: '100%' }}
                >
                  {competencias.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 4, color: colors.primary }}>Resultado</label>
              <textarea
                value={resultado}
                onChange={(e) => setResultado(e.target.value)}
                placeholder="Descripción del resultado"
                style={ta}
                rows={4}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 4, color: colors.primary }}>Fecha</label>
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                style={input}
              />
            </div>
            <button
              onClick={() => competencias.length > 0 && setStep(2)}
              style={{ ...btn, width: '100%', borderRadius: 999, padding: '8px 16px', fontSize: 14 }}
              disabled={competencias.length === 0}
            >
              Siguiente
            </button>
          </div>
        )}
        {step === 2 && (
          <div style={{ display: 'grid', gap: 16 }}>
            <h3 style={{ margin: 0, color: colors.primary }}>Nivel emocional (1‑10)</h3>
            {renderScale(nivelesKeys, niveles, setNiveles)}
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => setStep(1)}
                style={{ ...btnGhost, flex: 1, borderRadius: 999, padding: '8px 16px', fontSize: 14 }}
              >
                Atrás
              </button>
              <button
                onClick={() => setStep(3)}
                style={{ ...btn, flex: 1, borderRadius: 999, padding: '8px 16px', fontSize: 14 }}
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div style={{ display: 'grid', gap: 16 }}>
            <h3 style={{ margin: 0, color: colors.primary }}>Estado (1‑10)</h3>
            {renderScale(estadosKeys, estados, setEstados)}
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => setStep(2)}
                style={{ ...btnGhost, flex: 1, borderRadius: 999, padding: '8px 16px', fontSize: 14 }}
              >
                Atrás
              </button>
              <button
                onClick={() => setStep(4)}
                style={{ ...btn, flex: 1, borderRadius: 999, padding: '8px 16px', fontSize: 14 }}
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
        {step === 4 && (
          <div style={{ display: 'grid', gap: 12 }}>
            <h3 style={{ margin: 0, color: colors.primary }}>Dedicación (%)</h3>
            <div style={{ display: 'grid', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <label style={{ flex: 1, color: colors.primary }}>Técnicos</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={tec}
                  onChange={(e) => setTec(Number(e.target.value))}
                  style={{ ...input, width: 80 }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <label style={{ flex: 1, color: colors.primary }}>Tácticos</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={tac}
                  onChange={(e) => setTac(Number(e.target.value))}
                  style={{ ...input, width: 80 }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <label style={{ flex: 1, color: colors.primary }}>Físicos</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={fis}
                  onChange={(e) => setFis(Number(e.target.value))}
                  style={{ ...input, width: 80 }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <label style={{ flex: 1, color: colors.primary }}>Psicológicos</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={psi}
                  onChange={(e) => setPsi(Number(e.target.value))}
                  style={{ ...input, width: 80 }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <button
                onClick={() => setStep(3)}
                style={{ ...btnGhost, flex: 1, borderRadius: 999, padding: '8px 16px', fontSize: 14 }}
              >
                Atrás
              </button>
              <button
                onClick={save}
                style={{ ...btn, flex: 1, borderRadius: 999, padding: '8px 16px', fontSize: 14 }}
              >
                Guardar
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}