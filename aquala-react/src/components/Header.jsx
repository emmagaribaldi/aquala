const Header = ({ totalItems }) => {
  return (
    <header>
      <nav aria-label="Navegación principal">
        <a href="#" className="logo">
          Aquala 🧊
          {totalItems > 0 && (
            <span className="carrito-contador">{totalItems}</span>
          )}
        </a>
        <ul role="list">
          <li><a href="#productos">Productos</a></li>
          <li><a href="#nosotros">Nosotros</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header