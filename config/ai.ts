export type Provider = 'gemini' | 'groq';
export const PROVIDERS = {
  gemini: { label: 'Google Gemini', model: process.env.NEXT_PUBLIC_GEMINI_MODEL || 'gemini-2.0-flash' },
  groq: { label: 'Groq', model: process.env.NEXT_PUBLIC_GROQ_MODEL || 'llama-3.3-70b-versatile' },
};
export const DEFAULT_PROVIDER: Provider = process.env.NEXT_PUBLIC_AI_PROVIDER === 'groq' ? 'groq' : 'gemini';
