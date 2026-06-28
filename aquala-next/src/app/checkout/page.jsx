'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function CheckoutContent() {
  const searchParams = useSearchParams()
  const orden_id = searchParams.get('orden_id')
  const [orden, setOrden] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [pagando, setPagando] = useState(false)

  useEffect(() => {
    if (!orden_id) return
    fetch(`/api/ordenes/${orden_id}`)
      .then((res) => res.json())
      .then((data) => {
        setOrden(data)
        setCargando(false)
      })
  }, [orden_id])

  const handlePagar = async () => {
    setPagando(true)
    const res = await fetch('/api/pagos/crear-preferencia', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orden_id: parseInt(orden_id) }),
    })
    const data = await res.json()
    if (data.init_point) {
      window.location.href = data.init_point
    } else {
      alert('Error al crear preferencia de pago')
      setPagando(false)
    }
  }

  const formatearPrecio = (precio) => `$${precio?.toLocaleString('es-AR')}`

  if (cargando) return <p style={{ padding: '2rem' }}>Cargando orden...</p>
  if (!orden) return <p style={{ padding: '2rem' }}>Orden no encontrada</p>

  return (
    <main style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Resumen de tu orden</h1>
      <div style={{ background: '#fff', border: '4px solid #3498db', borderLeft: '4px solid #3498db', borderRadius: '8px', padding: '1.5rem', marginBottom: '1.5rem' }}>
        <p><strong>Orden #:</strong> {orden.id}</p>
        <p><strong>Cliente:</strong> {orden.nombre}</p>
        <p><strong>Email:</strong> {orden.email}</p>
        <p><strong>Estado:</strong> {orden.estado}</p>
        <hr style={{ margin: '1rem 0' }} />
        {orden.order_items?.map((item) => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>{item.nombre} x{item.cantidad}</span>
            <span>{formatearPrecio(item.precio * item.cantidad)}</span>
          </div>
        ))}
        <hr style={{ margin: '1rem 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.1rem' }}>
          <span>Total</span>
          <span>{formatearPrecio(orden.total)}</span>
        </div>
      </div>
      <button
        onClick={handlePagar}
        disabled={pagando}
        style={{
          width: '100%',
          padding: '1rem',
          background: pagando ? '#ccc' : '#27ae60',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: 'bold',
          cursor: pagando ? 'not-allowed' : 'pointer'
        }}
      >
        {pagando ? 'Redirigiendo...' : 'Pagar con Mercado Pago'}
      </button>
    </main>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<p style={{ padding: '2rem' }}>Cargando...</p>}>
      <CheckoutContent />
    </Suspense>
  )
}