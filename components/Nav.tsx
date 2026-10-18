'use client';
import Link from 'next/link'; import { useState } from 'react';
export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <Link href="/" className="brand">Virtual Interior Designer</Link>
      <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>Menu</button>
      <nav className={open ? 'links open' : 'links'} onClick={() => setOpen(false)}>
        <Link href="/">Home</Link><Link href="/#rooms">Rooms</Link><Link href="/#systems">Systems</Link><Link href="/gallery">Gallery</Link>
        <Link href="/designer" className="btn small">Start designing</Link>
      </nav>
    </header>
  );
}
