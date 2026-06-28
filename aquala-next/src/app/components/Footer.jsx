const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>Aquala</h3>
          <p>Termos premium para cada aventura.<br />Fríos 24hs, calientes 12hs.</p>
        </div>

        <div className="footer-links">
          <h4>Navegación</h4>
          <ul>
            <li><a href="#hero">Inicio</a></li>
            <li><a href="#productos">Productos</a></li>
            <li><a href="#comentarios">Comentarios</a></li>
            <li><a href="#nosotros">Nosotros</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Contacto</h4>
          <ul>
            <li>aquala@gmail.com</li>
            <li>+54 11 4823-9165</li>
            <li>Av. Santa Fe 2150, CABA</li>
            <li>Buenos Aires, Argentina</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Aquala. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer