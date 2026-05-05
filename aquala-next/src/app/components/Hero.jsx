import Link from 'next/link'

const Hero = () => {
  return (
    <section id="hero" aria-label="Presentación">
      <div className="hero-contenido">
        <div className="hero-texto">
          <h1>Hidratate con estilo</h1>
          <p>Termos premium para cada aventura. Fríos 24hs, calientes 12hs.</p>
          <Link href="#productos" className="btn-primary">Ver productos</Link>
        </div>
        <div className="hero-imagen">
          <img src="/hero.png" alt="Colección de termos Aquala en colores pastel" />
        </div>
      </div>
    </section>
  )
}

export default Hero