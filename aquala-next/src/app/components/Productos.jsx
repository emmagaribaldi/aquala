'use client'
import { useState, useEffect } from 'react'

const Productos = ({ agregarAlCarrito }) => {
  const [productos, setProductos] = useState([])
  const [notificacion, setNotificacion] = useState('')
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    fetch('/api/productos')
      .then((res) => res.json())
      .then((data) => {
        setProductos(data)
        setCargando(false)
      })
  }, [])

  const handleAgregar = (producto) => {
    agregarAlCarrito(producto)
    setNotificacion(`✅ ${producto.nombre} agregado al carrito`)
    setTimeout(() => setNotificacion(''), 3000)
  }

  const formatearPrecio = (precio) => `$${precio.toLocaleString('es-AR')}`

  if (cargando) return <p style={{ textAlign: 'center' }}>Cargando productos...</p>

  return (
    <section id="productos" aria-label="Catálogo de productos">
      <h2>Nuestros termos</h2>
      {notificacion && <div className="notificacion">{notificacion}</div>}
      <div className="productos-grid">
        {productos.map((producto) => (
          <article key={producto.id} className="producto-card">
            <img src={producto.imagen} alt={producto.alt} />
            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            <p className="precio">{formatearPrecio(producto.precio)}</p>
            <button
              type="button"
              aria-label={`Agregar ${producto.nombre} al carrito`}
              onClick={() => handleAgregar(producto)}
            >
              Agregar al carrito
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Productos