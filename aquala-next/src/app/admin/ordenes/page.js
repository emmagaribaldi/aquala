async function getOrdenes() {
  try {
    const res = await fetch('http://localhost:3000/api/ordenes', { cache: 'no-store' })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export default async function OrdenesPage() {
  const ordenes = await getOrdenes()

  const formatearPrecio = (precio) => `$${precio.toLocaleString('es-AR')}`

  return (
    <main style={{ padding: '2rem' }}>
      <h1>📦 Órdenes</h1>
      {ordenes.length === 0 ? (
        <p>No hay órdenes todavía.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#FF6B9D', color: 'white' }}>
              <th style={{ padding: '0.5rem' }}>#</th>
              <th style={{ padding: '0.5rem' }}>Cliente</th>
              <th style={{ padding: '0.5rem' }}>Email</th>
              <th style={{ padding: '0.5rem' }}>Total</th>
              <th style={{ padding: '0.5rem' }}>Estado</th>
              <th style={{ padding: '0.5rem' }}>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.map((orden) => (
              <tr key={orden.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '0.5rem', textAlign: 'center' }}>{orden.id}</td>
                <td style={{ padding: '0.5rem' }}>{orden.nombre}</td>
                <td style={{ padding: '0.5rem' }}>{orden.email}</td>
                <td style={{ padding: '0.5rem' }}>{formatearPrecio(orden.total)}</td>
                <td style={{ padding: '0.5rem' }}>{orden.estado}</td>
                <td style={{ padding: '0.5rem' }}>{new Date(orden.fecha).toLocaleDateString('es-AR')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  )
}