'use client'
import { useState } from 'react'
import Header from './Header'
import Hero from './Hero'
import Productos from './Productos'
import Contacto from './Contacto'
import Footer from './Footer'
import Carrito from './Carrito'

const ClientLayout = () => {
  const [carrito, setCarrito] = useState([])
  const [carritoAbierto, setCarritoAbierto] = useState(false)

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
  }

  const cambiarCantidad = (id, delta) => {
    setCarrito((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad + delta } : item
        )
        .filter((item) => item.cantidad > 0)
    )
  }

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id))
  }

  const vaciarCarrito = () => setCarrito([])

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0)

  return (
    <>
      <Header
        totalItems={totalItems}
        onAbrirCarrito={() => setCarritoAbierto(true)}
      />
      <main>
        <Hero />
        <Productos agregarAlCarrito={agregarAlCarrito} />
        <Contacto />
      </main>
      <Footer />
      <Carrito
        carrito={carrito}
        abierto={carritoAbierto}
        onCerrar={() => setCarritoAbierto(false)}
        onCambiarCantidad={cambiarCantidad}
        onEliminar={eliminarDelCarrito}
        onVaciar={vaciarCarrito}
      />
    </>
  )
}

export default ClientLayout