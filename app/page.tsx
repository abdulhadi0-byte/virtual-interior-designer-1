import Link from 'next/link'; import Nav from '@/components/Nav'; import { asset } from '@/lib/asset';
const rooms = [['Living room', 'living'], ['Dining room', 'dining'], ['Bedroom', 'bedroom'], ['Home office', 'office'], ['Lighting', 'lighting'], ['Decor', 'decor']];
const stats = [['2K+', 'Rooms designed'], ['12+', 'Years of experience'], ['98%', 'Client satisfaction'], ['15+', 'Design awards']];
export default function Home() {
  return (<>
    <Nav />
    <main id="top">
      <section className="hero" style={{ '--hero': `url(${asset('/images/hero.jpg')})` } as React.CSSProperties}>
        <div className="glass">
          <h1>See your room before you build it.</h1>
          <p>Describe a space, pick a style and get a full design plan with layout, palette, furniture and budget in seconds.</p>
          <div className="row"><Link href="/designer" className="btn">Start designing</Link><Link href="/#systems" className="btn ghost">How it works</Link></div>
        </div>
      </section>
      <section className="stats">{stats.map(([n, l]) => <div key={l}><b>{n}</b><span>{l}</span></div>)}</section>
      <section id="rooms" className="wrap">
        <h2>Find a plan for every part of your home.</h2>
        <div className="grid">{rooms.map(([n, k]) => (
          <Link key={k} href={`/designer?mode=rds&room=${encodeURIComponent(n)}`} className="tile" style={{ backgroundImage: `url(${asset(`/images/${k}.jpg`)}), linear-gradient(135deg,#8a6240,#d9bd97)` }}><span>{n}</span></Link>))}
        </div>
      </section>
      <section id="systems" className="wrap two">
        <Link href="/designer?mode=vids" className="card"><img src={asset('/logo-vids.jpg')} alt="" /><h3>Whole home design</h3><p>Plan an entire home: flow between rooms, one palette, one material story.</p></Link>
        <Link href="/designer?mode=rds" className="card"><img src={asset('/logo-rds.jpg')} alt="" /><h3>Single room design</h3><p>Go deep on one room with sized furniture and three budget tiers.</p></Link>
      </section>
      <section className="wrap about"><h2>Built for clients who want to decide with confidence.</h2><p>Every plan comes from your own brief. Add your Gemini or Groq key in the designer once, and it stays in your browser.</p></section>
    </main>
    <footer className="foot">Virtual Interior Designer</footer>
  </>);
}
