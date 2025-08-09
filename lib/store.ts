export type Competencia = {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  objGeneral: string;
  objetivos: { tecnicos: string[]; tacticos: string[]; fisicos: string[]; psicologicos: string[] };
  preCompetencia: string;
  aTenerEnCuenta: string;
};

export type Evaluacion = {
  id: string;
  resultado: string;
  fecha: string; // YYYY-MM-DD
  niveles: Record<string, number>;
  estados: Record<string, number>;
  dedicacion: { tecnicos: number; tacticos: number; fisicos: number; psicologicos: number };
};

const KEY_COMP = 'proto_competencias';
const KEY_EVAL = 'proto_evaluaciones';
const KEY_AUTH = 'proto_auth';

function get<T>(k: string, fallback: T): T { if (typeof window === 'undefined') return fallback; try { const v = localStorage.getItem(k); return v? JSON.parse(v) as T : fallback; } catch { return fallback; } }
function set<T>(k: string, v: T) { if (typeof window === 'undefined') return; localStorage.setItem(k, JSON.stringify(v)); }

export function createCompetencia(input: Omit<Competencia, 'id'>) {
  const list = get<Competencia[]>(KEY_COMP, []);
  const item: Competencia = { id: genId(), ...input };
  list.push(item); set(KEY_COMP, list); return item;
}

export function listCompetencias() { return get<Competencia[]>(KEY_COMP, []); }
const genId = () => `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;


export function createEvaluacion(input: Omit<Evaluacion, 'id'>) {
  const list = get<Evaluacion[]>(KEY_EVAL, []);
  const item: Evaluacion = { id: genId(), ...input };
  list.push(item); set(KEY_EVAL, list); return item;
}

export function listEvaluaciones() { return get<Evaluacion[]>(KEY_EVAL, []); }

export function saveAuth(v: any) { set(KEY_AUTH, v); }
export function getAuth() { return get(KEY_AUTH, null); }