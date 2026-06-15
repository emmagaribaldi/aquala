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
      <h1>Ordenes</h1>
      <p style={{ marginBottom: '1rem', color: '#666' }}>{ordenes.length} orden{ordenes.length !== 1 ? 'es' : ''} en total</p>
      {ordenes.length === 0 ? (
        <p>No hay ordenes todavia.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#FF6B9D', color: 'white' }}>
              <th style={{ padding: '0.75rem' }}>#</th>
              <th style={{ padding: '0.75rem' }}>Cliente</th>
              <th style={{ padding: '0.75rem' }}>Email</th>
              <th style={{ padding: '0.75rem' }}>Items</th>
              <th style={{ padding: '0.75rem' }}>Total</th>
              <th style={{ padding: '0.75rem' }}>Estado</th>
              <th style={{ padding: '0.75rem' }}>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.map((orden) => (
              <tr key={orden.id} style={{ borderBottom: '1px solid #eee', textAlign: 'center' }}>
                <td style={{ padding: '0.75rem' }}>{orden.id}</td>
                <td style={{ padding: '0.75rem' }}>{orden.nombre}</td>
                <td style={{ padding: '0.75rem' }}>{orden.email}</td>
                <td style={{ padding: '0.75rem' }}>
                  {orden.order_items?.map((item) => (
                    <div key={item.id}>{item.nombre} x{item.cantidad}</div>
                  ))}
                </td>
                <td style={{ padding: '0.75rem' }}>{formatearPrecio(orden.total)}</td>
                <td style={{ padding: '0.75rem' }}>
                  <span style={{
                    background: orden.estado === 'pendiente' ? '#fef3c7' : '#d1fae5',
                    color: orden.estado === 'pendiente' ? '#92400e' : '#065f46',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '999px',
                    fontSize: '0.85rem'
                  }}>
                    {orden.estado}
                  </span>
                </td>
                <td style={{ padding: '0.75rem' }}>{new Date(orden.created_at).toLocaleDateString('es-AR')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  )
}