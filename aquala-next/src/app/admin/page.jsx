export default function AdminPage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Panel de Administracion</h1>
      <p>Bienvenida al panel de Aquala</p>
      <nav style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
        <a href="/admin/ordenes" style={{ background: '#FF6B9D', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
          Ver ordenes
        </a>
      </nav>
    </main>
  )
}