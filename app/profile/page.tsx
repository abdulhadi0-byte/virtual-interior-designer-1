'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Nav from '@/components/Nav';
import { getSaved } from '@/lib/store';

export default function Profile() {
  const [name, setName] = useState('Abdul Hadi');
  const [role, setRole] = useState('Principal Architectural Interior Designer');
  const [studio, setStudio] = useState('Studio Hadi Architecture');
  const [location, setLocation] = useState('New York, NY');
  const [email, setEmail] = useState('contact@studiohadi.design');
  const [bio, setBio] = useState('Specializing in warm contemporary architecture, luxury residential curation, and seamless image-to-image AI interior space transformations.');
  const [style, setStyle] = useState('Warm modern');
  const [lighting, setLighting] = useState('2700K Warm Ambient');
  const [units, setUnits] = useState('Metric (mm / meters)');
  const [palette, setPalette] = useState('Cream & Warm Travertine');
  const [savedCount, setSavedCount] = useState(0);
  const [editing, setEditing] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('vid-user-profile');
      if (stored) {
        const p = JSON.parse(stored);
        if (p.name) setName(p.name);
        if (p.role) setRole(p.role);
        if (p.studio) setStudio(p.studio);
        if (p.location) setLocation(p.location);
        if (p.email) setEmail(p.email);
        if (p.bio) setBio(p.bio);
        if (p.style) setStyle(p.style);
        if (p.lighting) setLighting(p.lighting);
        if (p.units) setUnits(p.units);
        if (p.palette) setPalette(p.palette);
      }
      setSavedCount(getSaved().length);
    } catch {}
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { name, role, studio, location, email, bio, style, lighting, units, palette };
    try {
      localStorage.setItem('vid-user-profile', JSON.stringify(updated));
    } catch {}
    setEditing(false);
    setToast('Profile and studio preferences updated!');
    setTimeout(() => setToast(''), 3000);
  };

  const names = (name || 'AH').trim().split(' ');
  const initials = names.length > 1 ? (names[0][0] + names[names.length - 1][0]).toUpperCase() : names[0].slice(0, 2).toUpperCase();

  return (
    <>
      <Nav />
      <main className="wrap">
        {toast && (
          <div style={{ position: 'fixed', bottom: 30, right: 30, background: '#251810', color: '#fff', padding: '12px 24px', borderRadius: 999, zIndex: 1000 }}>
            {toast}
          </div>
        )}

        <div style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(246,242,236,0.95))',
          border: '1px solid #e8dccb',
          borderRadius: 28,
          padding: '36px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 24,
          marginBottom: 32
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <div style={{
              width: 88, height: 88, borderRadius: '50%',
              background: 'linear-gradient(135deg, #a8794c, #251810)',
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 32, fontFamily: 'var(--f-display)', fontWeight: 700,
              boxShadow: '0 8px 24px rgba(37,24,16,0.18)', border: '4px solid #fff'
            }}>
              {initials}
            </div>
            <div>
              <h1 style={{ fontSize: 32, color: '#251810', marginBottom: 4 }}>{name}</h1>
              <div style={{ fontSize: 15, color: '#a8794c', fontWeight: 700, marginBottom: 8 }}>{role}</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 12, padding: '4px 10px', background: '#fdf8eb', border: '1px solid #e5cb91', color: '#8c6922', borderRadius: 999, fontWeight: 700 }}>★ Pro Studio Member</span>
                <span style={{ fontSize: 12, padding: '4px 10px', background: '#e8f5e9', border: '1px solid #c8e6c9', color: '#2e7d32', borderRadius: 999, fontWeight: 700 }}>✓ Verified Architect</span>
                <span style={{ fontSize: 12, padding: '4px 10px', background: '#f6f2ec', border: '1px solid #e6dac8', borderRadius: 999 }}>{studio}</span>
              </div>
            </div>
          </div>
          <button type="button" className="btn small" onClick={() => setEditing(!editing)}>
            {editing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {editing ? (
          <form onSubmit={handleSave} className="card" style={{ padding: 32, display: 'grid', gap: 16 }}>
            <h3>Edit Studio Profile Preferences</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
              <label>Full Name <input type="text" value={name} onChange={(e) => setName(e.target.value)} required /></label>
              <label>Studio Name <input type="text" value={studio} onChange={(e) => setStudio(e.target.value)} required /></label>
              <label>Professional Title <input type="text" value={role} onChange={(e) => setRole(e.target.value)} required /></label>
              <label>Location <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} /></label>
              <label>Professional Email <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
            </div>
            <label>Studio Philosophy & Bio <textarea rows={3} value={bio} onChange={(e) => setBio(e.target.value)} /></label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginTop: 8 }}>
              <label>Signature Design Style
                <select value={style} onChange={(e) => setStyle(e.target.value)}>
                  <option>Warm modern</option>
                  <option>Minimalist Luxury</option>
                  <option>Japandi</option>
                  <option>Scandinavian</option>
                  <option>Mid-Century Modern</option>
                  <option>Industrial Chic</option>
                </select>
              </label>
              <label>Lighting CCT
                <select value={lighting} onChange={(e) => setLighting(e.target.value)}>
                  <option>2700K Warm Ambient</option>
                  <option>3000K Soft White</option>
                  <option>4000K Natural Daylight</option>
                </select>
              </label>
              <label>Units
                <select value={units} onChange={(e) => setUnits(e.target.value)}>
                  <option>Metric (mm / meters)</option>
                  <option>Imperial (ft / inches)</option>
                </select>
              </label>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 16 }}>
              <button type="button" className="btn ghost small" onClick={() => setEditing(false)}>Cancel</button>
              <button type="submit" className="btn small">Save Changes</button>
            </div>
          </form>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 28 }}>
            <div className="card" style={{ padding: 32 }}>
              <h3>Architectural Preferences</h3>
              <div style={{ display: 'grid', gap: 16, marginTop: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f6f2ec', paddingBottom: 10 }}>
                  <div><b>Signature Design Style</b><div style={{ fontSize: 13, color: '#777' }}>Primary interior aesthetic applied to briefs</div></div>
                  <span style={{ padding: '4px 12px', background: '#f6f2ec', borderRadius: 999, fontSize: 13, fontWeight: 600 }}>{style}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f6f2ec', paddingBottom: 10 }}>
                  <div><b>Lighting Temperature</b><div style={{ fontSize: 13, color: '#777' }}>Default ambient architectural illumination</div></div>
                  <span style={{ padding: '4px 12px', background: '#f6f2ec', borderRadius: 999, fontSize: 13, fontWeight: 600 }}>{lighting}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f6f2ec', paddingBottom: 10 }}>
                  <div><b>Dimensional Measurement</b><div style={{ fontSize: 13, color: '#777' }}>Units used for spatial plans</div></div>
                  <span style={{ padding: '4px 12px', background: '#f6f2ec', borderRadius: 999, fontSize: 13, fontWeight: 600 }}>{units}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div><b>Material & Finish Palette</b><div style={{ fontSize: 13, color: '#777' }}>Default textural curation</div></div>
                  <span style={{ padding: '4px 12px', background: '#f6f2ec', borderRadius: 999, fontSize: 13, fontWeight: 600 }}>{palette}</span>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: 32 }}>
              <h3>Studio Philosophy</h3>
              <p style={{ fontSize: 14, color: '#645347', lineHeight: 1.7, marginBottom: 16 }}>{bio}</p>
              <div style={{ fontSize: 13, color: '#8c7b6f', display: 'grid', gap: 8, borderTop: '1px solid #e6dac8', paddingTop: 16 }}>
                <div>📍 <b>Location:</b> {location}</div>
                <div>✉️ <b>Email:</b> {email}</div>
                <div>🎨 <b>Saved Projects:</b> {savedCount}</div>
              </div>
              <div style={{ marginTop: 24, display: 'grid', gap: 10 }}>
                <Link href="/designer" className="btn small" style={{ textAlign: 'center' }}>Redesign Room Studio</Link>
                <Link href="/gallery" className="btn ghost small" style={{ textAlign: 'center' }}>View Gallery</Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
