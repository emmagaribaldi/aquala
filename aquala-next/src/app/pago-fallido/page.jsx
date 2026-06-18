'use client'

export default function PagoFallido() {
  return (
    <main style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ borderTop: '6px solid #e74c3c', borderRadius: '8px', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h1 style={{ color: '#e74c3c' }}>Pago rechazado</h1>
        <p>No pudimos procesar tu pago. Posibles razones:</p>
        <ul style={{ textAlign: 'left', display: 'inline-block', marginTop: '1rem' }}>
          <li>Fondos insuficientes</li>
          <li>Tarjeta rechazada por el banco</li>
          <li>Cancelaste el pago</li>
        </ul>
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <a href="/" style={{ padding: '0.75rem 1.5rem', background: '#FF6B9D', color: 'white', borderRadius: '8px', textDecoration: 'none' }}>
            Volver al inicio
          </a>
        </div>
      </div>
    </main>
  )
}