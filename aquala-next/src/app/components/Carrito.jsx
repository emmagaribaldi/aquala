'use client'
import { useRouter } from 'next/navigation'

const formatearPrecio = (precio) =>
  `$${precio.toLocaleString("es-AR")}`

const Carrito = ({ carrito, abierto, onCerrar, onCambiarCantidad, onEliminar, onVaciar }) => {
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0)
  const router = useRouter()

  const finalizarCompra = async () => {
    if (carrito.length === 0) return

    const nombre = prompt('Tu nombre:')
    const email = prompt('Tu email:')

    if (!nombre || !email) return

    const res = await fetch('/api/ordenes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: carrito, nombre, email }),
    })

    const data = await res.json()

    if (!res.ok) {
      alert(`Error: ${data.error}`)
      return
    }

    onVaciar()
    onCerrar()
    router.push(`/checkout?orden_id=${data.id}`)
  }

  return (
    <>
      {abierto && (
        <div
          className="carrito-overlay"
          onClick={onCerrar}
          aria-hidden="true"
        />
      )}
      <aside
        className={`carrito-panel ${abierto ? "abierto" : ""}`}
        aria-label="Carrito de compras"
      >
        <div className="carrito-header">
          <h2>Tu carrito</h2>
          <button onClick={onCerrar} aria-label="Cerrar carrito">X</button>
        </div>

        <div className="carrito-items">
          {carrito.length === 0 ? (
            <div className="carrito-vacio">
              <p>Tu carrito esta vacio</p>
            </div>
          ) : (
            carrito.map((item) => (
              <div key={item.id} className="carrito-item">
                <div className="carrito-item-info">
                  <p className="carrito-item-nombre">{item.nombre}</p>
                  <p className="carrito-item-precio">{formatearPrecio(item.precio)}</p>
                </div>
                <div className="carrito-item-acciones">
                  <button onClick={() => onCambiarCantidad(item.id, -1)} aria-label="Reducir cantidad">-</button>
                  <span>{item.cantidad}</span>
                  <button onClick={() => onCambiarCantidad(item.id, 1)} aria-label="Aumentar cantidad">+</button>
                  <button onClick={() => onEliminar(item.id)} aria-label={`Eliminar ${item.nombre}`}>X</button>
                </div>
              </div>
            ))
          )}
        </div>

        {carrito.length > 0 && (
          <div className="carrito-footer">
            <div className="carrito-total">
              <span>{totalItems} producto{totalItems !== 1 ? "s" : ""}</span>
              <strong>Total: {formatearPrecio(total)}</strong>
            </div>
            <button className="btn-finalizar" onClick={finalizarCompra}>Finalizar compra</button>
            <button className="btn-vaciar" onClick={onVaciar}>Vaciar carrito</button>
          </div>
        )}
      </aside>
    </>
  )
}

export default Carrito