import { useState, useEffect } from "react"

const Productos = ({ agregarAlCarrito }) => {
  const [productos, setProductos] = useState([])
  const [notificacion, setNotificacion] = useState("")

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/emmagaribaldi/Aquala/main/productos.json")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error al cargar productos:", err))
  }, [])

  const handleAgregar = (producto) => {
    agregarAlCarrito(producto)
    setNotificacion(`✅ ${producto.nombre} agregado al carrito`)
    setTimeout(() => setNotificacion(""), 3000)
  }

  const formatearPrecio = (precio) => {
    return `$${precio.toLocaleString("es-AR")}`
  }

  return (
    <section id="productos" aria-label="Catálogo de productos">
      <h2>Nuestros termos</h2>

      {notificacion && (
        <div className="notificacion">{notificacion}</div>
      )}

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