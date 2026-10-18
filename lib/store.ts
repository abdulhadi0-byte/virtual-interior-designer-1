export type Saved = { id: number; mode: string; room: string; style: string; budget: string; text: string; date: string };
const get = (k: string) => { try { return localStorage.getItem(k) || ''; } catch { return ''; } };
const set = (k: string, v: string) => { try { localStorage.setItem(k, v); } catch {} };
export const getKey = (p: string) => get(`vid-key-${p}`);
export const setKey = (p: string, v: string) => set(`vid-key-${p}`, v);
export const getSaved = (): Saved[] => { try { return JSON.parse(get('vid-saved') || '[]'); } catch { return []; } };
export const addSaved = (s: Saved) => set('vid-saved', JSON.stringify([s, ...getSaved()]));
export const removeSaved = (id: number) => set('vid-saved', JSON.stringify(getSaved().filter((s) => s.id !== id)));
