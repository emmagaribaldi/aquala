import { useState } from "react"
import Header from "./components/Header"
import Hero from "./components/Hero"
import Productos from "./components/Productos"
import Contacto from "./components/Contacto"
import Footer from "./components/Footer"

function App() {
  const [carrito, setCarrito] = useState([])

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

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0)

  return (
    <>
      <Header totalItems={totalItems} />
      <main>
        <Hero />
        <Productos agregarAlCarrito={agregarAlCarrito} />
        <Contacto />
      </main>
      <Footer />
    </>
  )
}

export default App