'use client'
import { useState } from 'react'
import Link from 'next/link'

const Header = () => {
  const [totalItems, setTotalItems] = useState(0)

  return (
    <header>
      <nav aria-label="Navegación principal">
        <Link href="/" className="logo">
          Aquala
          {totalItems > 0 && (
            <span className="carrito-contador">{totalItems}</span>
          )}
        </Link>
        <ul role="list">
          <li><Link href="#productos">Productos</Link></li>
          <li><Link href="#nosotros">Nosotros</Link></li>
          <li><Link href="#contacto">Contacto</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header