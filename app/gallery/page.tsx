'use client';
import Link from 'next/link'; import { useEffect, useState } from 'react';
import Nav from '@/components/Nav'; import { getSaved, removeSaved, Saved } from '@/lib/store';
export default function Gallery() {
  const [items, setItems] = useState<Saved[] | null>(null);
  useEffect(() => setItems(getSaved()), []);
  const del = (id: number) => { removeSaved(id); setItems(getSaved()); };
  return (<>
    <Nav />
    <main className="wrap">
      <h2>Your saved designs</h2>
      {items === null ? <p>Loading</p> : items.length === 0
        ? <p>Nothing saved yet. <Link href="/designer" className="link">Create your first design plan</Link></p>
        : <div className="saved">{items.map((s) => (
          <details key={s.id} className="card">
            <summary><b>{s.room}</b> in {s.style} style <small>{new Date(s.date).toLocaleDateString()}</small></summary>
            <pre className="plan">{s.text}</pre>
            <div className="row"><button className="btn ghost small" onClick={() => navigator.clipboard.writeText(s.text)}>Copy</button><button className="btn ghost small" onClick={() => del(s.id)}>Delete</button></div>
          </details>))}</div>}
    </main></>);
}
