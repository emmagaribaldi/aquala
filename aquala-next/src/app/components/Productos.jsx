'use client'
import { useState } from 'react'

const productosData = [
  {
    id: 1,
    nombre: "Aquala Classic Lavender",
    precio: 50000,
    descripcion: "600ml, tapa freesip, doble pared de acero inoxidable. Mantiene tu bebida fría 24hs y caliente 12hs.",
    imagen: "/classic.png",
    alt: "Termo Aquala Classic color lavanda con tapa freesip"
  },
  {
    id: 2,
    nombre: "Aquala Sway Cream",
    precio: 55000,
    descripcion: "800ml, asa de cuero, tapa freesip, doble pared de acero inoxidable. Diseñado para llevarlo a donde vayas.",
    imagen: "/sport.png",
    alt: "Termo Aquala Sway color crema con asa de cuero"
  },
  {
    id: 3,
    nombre: "Aquala SmoothSip Rosa",
    precio: 60000,
    descripcion: "1L, tapa con botón push, color rosa salmón con detalles grises. Perfecta para café, mate o agua fría.",
    imagen: "/pro.png",
    alt: "Termo Aquala SmoothSip color rosa salmón con tapa gris"
  }
]

const Productos = () => {
  const [carrito, setCarrito] = useState([])
  const [notificacion, setNotificacion] = useState('')

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id)
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      }
      return [...prev, { ...producto, cantidad: 1 }]
    })
    setNotificacion(`✅ ${producto.nombre} agregado al carrito`)
    setTimeout(() => setNotificacion(''), 3000)
  }

  const formatearPrecio = (precio) => {
    return `$${precio.toLocaleString('es-AR')}`
  }

  return (
    <section id="productos" aria-label="Catálogo de productos">
      <h2>Nuestros termos</h2>

      {notificacion && (
        <div className="notificacion">{notificacion}</div>
      )}

      <div className="productos-grid">
        {productosData.map((producto) => (
          <article key={producto.id} className="producto-card">
            <img src={producto.imagen} alt={producto.alt} />
            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            <p className="precio">{formatearPrecio(producto.precio)}</p>
            <button
              type="button"
              aria-label={`Agregar ${producto.nombre} al carrito`}
              onClick={() => agregarAlCarrito(producto)}
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