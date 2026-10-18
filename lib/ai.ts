import { PROVIDERS, Provider } from '@/config/ai';
export async function generate(p: Provider, key: string, system: string, prompt: string): Promise<string> {
  const { label, model } = PROVIDERS[p];
  try {
    const r = p === 'gemini'
      ? await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
          method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
          body: JSON.stringify({ systemInstruction: { parts: [{ text: system }] }, contents: [{ role: 'user', parts: [{ text: prompt }] }] }) })
      : await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
          body: JSON.stringify({ model, messages: [{ role: 'system', content: system }, { role: 'user', content: prompt }] }) });
    if (!r.ok) throw new Error(`${label} rejected the request (${r.status}). Check that your API key is correct.`);
    const d = await r.json();
    return (p === 'gemini' ? d.candidates?.[0]?.content?.parts?.map((x: any) => x.text).join('') : d.choices?.[0]?.message?.content) ?? '';
  } catch (e: any) {
    throw e instanceof TypeError ? new Error(`Could not reach ${label}. Check your connection and try again.`) : e;
  }
}
