const Header = ({ totalItems, onAbrirCarrito }) => {
  return (
    <header>
      <nav aria-label="Navegación principal">
        <a href="#" className="logo">Aquala</a>
        <ul role="list">
          <li><a href="#productos">Productos</a></li>
          <li><a href="#nosotros">Nosotros</a></li>
          <li><a href="#contacto">Contacto</a></li>
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