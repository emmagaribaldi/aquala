'use client'

export default function PagoPendiente() {
  return (
    <main style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ borderTop: '6px solid #f39c12', borderRadius: '8px', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h1 style={{ color: '#f39c12' }}>Pago pendiente</h1>
        <p>Tu pago está siendo procesado.</p>
        <p>Las transferencias pueden tardar 1-2 días hábiles en confirmarse.</p>
        <p>Te notificaremos cuando se confirme el pago.</p>
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <a href="/" style={{ padding: '0.75rem 1.5rem', background: '#FF6B9D', color: 'white', borderRadius: '8px', textDecoration: 'none' }}>
            Volver al inicio
          </a>
        </div>
      </div>
    </main>
  )
}