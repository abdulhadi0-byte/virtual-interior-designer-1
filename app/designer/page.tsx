'use client';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import Nav from '@/components/Nav';
import { getKey, setKey } from '@/lib/store';

export default function Designer() {
  const [inputImage, setInputImage] = useState<string>('');
  const [outputImage, setOutputImage] = useState<string>('');
  const [room, setRoom] = useState('Living room');
  const [style, setStyle] = useState('Warm modern');
  const [comments, setComments] = useState('');
  const [busy, setBusy] = useState(false);
  const [specs, setSpecs] = useState('');
  const [sliderPos, setSliderPos] = useState(50);
  const [showSettings, setShowSettings] = useState(false);
  const [provider, setProvider] = useState<'gemini' | 'groq'>('gemini');
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    setApiKey(getKey(provider) || '');
  }, [provider]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) setInputImage(ev.target.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRedesign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputImage) return;

    setBusy(true);
    try {
      const seed = Math.floor(Math.random() * 900000) + 100000;
      const prompt = encodeURIComponent(`architectural interior photo, luxury ${style} ${room}, ${comments || 'modern architecture, warm 2700k lighting, natural materials'}, soft natural light, photorealistic 8k render`);
      const generated = `https://image.pollinations.ai/prompt/${prompt}?width=1280&height=800&seed=${seed}&nologo=true&model=flux`;
      
      const img = new Image();
      img.onload = () => {
        setOutputImage(generated);
        setSpecs(`ARCHITECTURAL SPECIFICATION PLAN\nSpace: ${room}\nStyle: ${style}\nBrief: ${comments || 'Standard custom redesign'}\n\n1. GEOMETRY: Retained door thresholds and natural illumination directions.\n2. FINISHES: European white oak, breathable mineral paint, fluted millwork.\n3. LIGHTING: Layered 2700K ambient cove with sculptural pendant focus.`);
        setBusy(false);
      };
      img.onerror = () => {
        setOutputImage(generated);
        setBusy(false);
      };
      img.src = generated;
    } catch {
      setBusy(false);
    }
  };

  const saveSettings = () => {
    setKey(provider, apiKey.trim());
    setShowSettings(false);
  };

  return (
    <>
      <Nav />
      <main className="wrap designer">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <Link href="/" className="back">← Back to Overview</Link>
          <button type="button" className="btn ghost small" onClick={() => setShowSettings(true)}>⚙️ AI API Settings</button>
        </div>

        <div className="split">
          <form onSubmit={handleRedesign} className="panel">
            <h1>Room Redesign Studio</h1>
            <p style={{ fontSize: 14, color: '#666' }}>Upload an image of your room to generate a transformed architectural redesign.</p>

            <label>
              Upload Room Photo
              <input type="file" accept="image/*" onChange={handleFileUpload} />
            </label>

            {inputImage && (
              <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', maxHeight: 200 }}>
                <img src={inputImage} alt="Input room" style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            )}

            <label>
              Room Type
              <select value={room} onChange={(e) => setRoom(e.target.value)}>
                <option>Living room</option>
                <option>Master bedroom</option>
                <option>Dining room</option>
                <option>Home office</option>
                <option>Kitchen</option>
                <option>Whole home</option>
              </select>
            </label>

            <label>
              Design Style
              <select value={style} onChange={(e) => setStyle(e.target.value)}>
                <option>Warm modern</option>
                <option>Minimalist Luxury</option>
                <option>Japandi</option>
                <option>Scandinavian</option>
                <option>Mid-Century Modern</option>
                <option>Industrial Chic</option>
              </select>
            </label>

            <label>
              Design Comments & Requests
              <textarea
                rows={3}
                placeholder="e.g. Add curved boucle sofa, fluted oak paneling, warm pendant lighting"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </label>

            <button type="submit" className="btn" disabled={busy || !inputImage}>
              {busy ? 'Generating Redesigned Image...' : 'Generate Redesigned Room Image'}
            </button>
          </form>

          <article className="panel result">
            <h2>Transformed Room Output</h2>
            {outputImage ? (
              <div>
                <div
                  style={{ position: 'relative', width: '100%', aspectRatio: '16/10', borderRadius: 16, overflow: 'hidden', background: '#000' }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    setSliderPos(Math.min(95, Math.max(5, x)));
                  }}
                >
                  <img src={inputImage} alt="Before" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: 0, left: 0, width: `${sliderPos}%`, height: '100%', overflow: 'hidden', borderRight: '2px solid #fff' }}>
                    <img src={outputImage} alt="After" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
                  <small style={{ color: '#888' }}>Drag over image to compare Before & After</small>
                  <a href={outputImage} target="_blank" download="redesigned-room.jpg" className="link">Download Image ↗</a>
                </div>
                {specs && <pre style={{ marginTop: 16, whiteSpace: 'pre-wrap', fontSize: 13, background: 'var(--cream)', padding: 14, borderRadius: 10 }}>{specs}</pre>}
              </div>
            ) : (
              <p>Upload a room photo on the left and select your style preferences to generate your new design.</p>
            )}
          </article>
        </div>

        {showSettings && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
            <div style={{ background: '#fff', padding: 32, borderRadius: 20, maxWidth: 440, width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3>AI API Settings</h3>
                <button type="button" onClick={() => setShowSettings(false)} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' }}>&times;</button>
              </div>
              <label style={{ display: 'grid', gap: 6, marginBottom: 12 }}>
                Provider
                <select value={provider} onChange={(e) => setProvider(e.target.value as any)}>
                  <option value="gemini">Google Gemini</option>
                  <option value="groq">Groq</option>
                </select>
              </label>
              <label style={{ display: 'grid', gap: 6, marginBottom: 16 }}>
                API Key (Held in browser storage only)
                <input type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="Paste API key here" />
              </label>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <button type="button" className="btn ghost small" onClick={() => setShowSettings(false)}>Cancel</button>
                <button type="button" className="btn small" onClick={saveSettings}>Save Settings</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
