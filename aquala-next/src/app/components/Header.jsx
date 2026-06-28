'use client'
import Link from 'next/link'

const Header = ({ totalItems, onAbrirCarrito }) => {
  return (
    <header>
      <nav aria-label="Navegación principal">
        <Link href="/" className="logo">Aquala</Link>
        <ul role="list">
          <li><Link href="#hero">Inicio</Link></li>
          <li><Link href="#productos">Productos</Link></li>
          <li><Link href="#comentarios">Comentarios</Link></li>
          <li><Link href="#nosotros">Nosotros</Link></li>
          <li><Link href="#contacto">Contacto</Link></li>
          <li>
            <button
              id="btn-carrito"
              type="button"
              aria-label="Abrir carrito"
              onClick={onAbrirCarrito}
            >
              🛒 {totalItems > 0 && <span className="carrito-contador">{totalItems}</span>}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header