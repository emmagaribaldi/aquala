'use client'
import { useSearchParams, Suspense } from 'next/navigation'

function PagoCompletadoContent() {
  const searchParams = useSearchParams()
  const payment_id = searchParams.get('payment_id')
  const external_reference = searchParams.get('external_reference')

  return (
    <main style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ borderTop: '6px solid #27ae60', borderRadius: '8px', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h1 style={{ color: '#27ae60' }}>Pago aprobado</h1>
        <p>Tu pago fue procesado correctamente.</p>
        {payment_id && <p><strong>ID de pago:</strong> {payment_id}</p>}
        {external_reference && <p><strong>Referencia:</strong> {external_reference}</p>}
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <a href="/" style={{ padding: '0.75rem 1.5rem', background: '#FF6B9D', color: 'white', borderRadius: '8px', textDecoration: 'none' }}>
            Seguir comprando
          </a>
        </div>
      </div>
    </main>
  )
}

export default function PagoCompletado() {
  return (
    <Suspense fallback={<p style={{ padding: '2rem' }}>Cargando...</p>}>
      <PagoCompletadoContent />
    </Suspense>
  )
}