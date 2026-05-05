// ===== CARRITO =====
let carrito = [];

// ===== FETCH - Cargar productos desde JSON =====
const cargarProductos = async () => {
  try {
    const respuesta = await fetch("productos.json");
    const productos = await respuesta.json();
    renderizarProductos(productos);
  } catch (error) {
    console.error("Error al cargar productos:", error);
    mostrarNotificacion("❌ Error al cargar los productos");
  }
};

// ===== RENDER - Mostrar productos en el DOM =====
const renderizarProductos = (productos) => {
  const grid = document.querySelector(".productos-grid");
  grid.innerHTML = "";

  productos.forEach((producto) => {
    const card = document.createElement("article");
    card.classList.add("producto-card");
    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.alt}" />
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion}</p>
      <p class="precio">${formatearPrecio(producto.precio)}</p>
      <button 
        type="button" 
        aria-label="Agregar ${producto.nombre} al carrito"
        data-id="${producto.id}"
        data-nombre="${producto.nombre}"
        data-precio="${producto.precio}">
        Agregar al carrito
      </button>
    `;
    grid.appendChild(card);
  });

  // Delegación de eventos - un solo listener para todos los botones
  grid.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const { id, nombre, precio } = e.target.dataset;
      agregarAlCarrito(Number(id), nombre, Number(precio));
    }
  });
};

// ===== CARRITO - Lógica =====
const agregarAlCarrito = (id, nombre, precio) => {
  const itemExistente = carrito.find((item) => item.id === id);

  if (itemExistente) {
    itemExistente.cantidad++;
  } else {
    carrito.push({ id, nombre, precio, cantidad: 1 });
  }

  mostrarNotificacion(`✅ ${nombre} agregado al carrito`);
  actualizarContadorCarrito();
  renderizarCarrito();
};

const eliminarDelCarrito = (id) => {
  carrito = carrito.filter((item) => item.id !== id);
  actualizarContadorCarrito();
  renderizarCarrito();
};

const cambiarCantidad = (id, delta) => {
  const item = carrito.find((item) => item.id === id);
  if (!item) return;

  item.cantidad += delta;

  if (item.cantidad <= 0) {
    eliminarDelCarrito(id);
  } else {
    actualizarContadorCarrito();
    renderizarCarrito();
  }
};

// ===== CARRITO - Panel visual =====
const crearPanelCarrito = () => {
  // Overlay
  const overlay = document.createElement("div");
  overlay.id = "carrito-overlay";
  overlay.style.cssText = `
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.4);
    z-index: 998;
  `;
  overlay.addEventListener("click", cerrarCarrito);

  // Panel
  const panel = document.createElement("aside");
  panel.id = "carrito-panel";
  panel.setAttribute("aria-label", "Carrito de compras");
  panel.style.cssText = `
    position: fixed;
    top: 0;
    right: -420px;
    width: 380px;
    height: 100%;
    background: white;
    z-index: 999;
    box-shadow: -4px 0 24px rgba(0,0,0,0.15);
    display: flex;
    flex-direction: column;
    transition: right 0.3s ease;
    font-family: 'Inter', sans-serif;
  `;

  panel.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; padding:1.5rem; border-bottom:1px solid #f0f0f0;">
      <h2 style="margin:0; font-size:1.2rem; color:#2d3748;">🛒 Tu carrito</h2>
      <button id="cerrar-carrito" aria-label="Cerrar carrito" style="background:none; border:none; font-size:1.5rem; cursor:pointer; color:#718096;">✕</button>
    </div>
    <div id="carrito-items" style="flex:1; overflow-y:auto; padding:1rem;"></div>
    <div id="carrito-footer" style="padding:1.5rem; border-top:1px solid #f0f0f0;"></div>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(panel);

  document.getElementById("cerrar-carrito").addEventListener("click", cerrarCarrito);
};

const abrirCarrito = () => {
  document.getElementById("carrito-overlay").style.display = "block";
  document.getElementById("carrito-panel").style.right = "0";
};

const cerrarCarrito = () => {
  document.getElementById("carrito-overlay").style.display = "none";
  document.getElementById("carrito-panel").style.right = "-420px";
};

const renderizarCarrito = () => {
  const contenedor = document.getElementById("carrito-items");
  const footer = document.getElementById("carrito-footer");
  if (!contenedor) return;

  if (carrito.length === 0) {
    contenedor.innerHTML = `
      <div style="text-align:center; padding:3rem 1rem; color:#a0aec0;">
        <div style="font-size:3rem;">🧴</div>
        <p style="margin-top:1rem;">Tu carrito está vacío</p>
      </div>
    `;
    footer.innerHTML = "";
    return;
  }

  contenedor.innerHTML = carrito.map((item) => `
    <div style="display:flex; align-items:center; gap:1rem; padding:1rem 0; border-bottom:1px solid #f7f7f7;">
      <div style="flex:1;">
        <p style="margin:0; font-weight:600; color:#2d3748; font-size:0.95rem;">${item.nombre}</p>
        <p style="margin:0.25rem 0 0; color:#FF6B9D; font-weight:700;">${formatearPrecio(item.precio)}</p>
      </div>
      <div style="display:flex; align-items:center; gap:0.5rem;">
        <button 
          onclick="cambiarCantidad(${item.id}, -1)"
          aria-label="Reducir cantidad"
          style="width:28px; height:28px; border-radius:50%; border:1px solid #e2e8f0; background:white; cursor:pointer; font-size:1rem; display:flex; align-items:center; justify-content:center;">−</button>
        <span style="min-width:20px; text-align:center; font-weight:600;">${item.cantidad}</span>
        <button 
          onclick="cambiarCantidad(${item.id}, 1)"
          aria-label="Aumentar cantidad"
          style="width:28px; height:28px; border-radius:50%; border:1px solid #e2e8f0; background:white; cursor:pointer; font-size:1rem; display:flex; align-items:center; justify-content:center;">+</button>
        <button 
          onclick="eliminarDelCarrito(${item.id})"
          aria-label="Eliminar ${item.nombre}"
          style="width:28px; height:28px; border-radius:50%; border:none; background:#FFF0F6; cursor:pointer; color:#FF6B9D; font-size:0.9rem; display:flex; align-items:center; justify-content:center;">🗑️</button>
      </div>
    </div>
  `).join("");

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  footer.innerHTML = `
    <div style="display:flex; justify-content:space-between; margin-bottom:1rem;">
      <span style="color:#718096;">${totalItems} producto${totalItems !== 1 ? "s" : ""}</span>
      <span style="font-weight:700; font-size:1.1rem; color:#2d3748;">Total: ${formatearPrecio(total)}</span>
    </div>
    <button style="width:100%; padding:0.9rem; background:#FF6B9D; color:white; border:none; border-radius:12px; font-size:1rem; font-weight:600; cursor:pointer;">
      Finalizar compra
    </button>
    <button onclick="vaciarCarrito()" style="width:100%; padding:0.7rem; background:none; border:none; color:#a0aec0; font-size:0.85rem; cursor:pointer; margin-top:0.5rem;">
      Vaciar carrito
    </button>
  `;
};

const vaciarCarrito = () => {
  carrito = [];
  actualizarContadorCarrito();
  renderizarCarrito();
};

// ===== UTILIDADES =====
const formatearPrecio = (precio) => {
  return `$${precio.toLocaleString("es-AR")}`;
};

const mostrarNotificacion = (mensaje) => {
  const notif = document.createElement("div");
  notif.textContent = mensaje;
  notif.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: #FF6B9D;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    font-weight: 600;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(255,107,157,0.3);
  `;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 3000);
};

const actualizarContadorCarrito = () => {
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const contador = document.getElementById("carrito-contador");
  contador.textContent = totalItems > 0 ? totalItems : "";
};

// ===== FORMULARIO =====
const validarFormulario = (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  if (!nombre || !email || !mensaje) {
    mostrarNotificacion("❌ Por favor completá todos los campos");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    mostrarNotificacion("❌ El email no es válido");
    return;
  }

  mostrarNotificacion("✅ Mensaje enviado correctamente!");
  e.target.reset();
};

// ===== INICIALIZACIÓN =====
document.addEventListener("DOMContentLoaded", () => {
  crearPanelCarrito();
  cargarProductos();
  document.getElementById("btn-carrito").addEventListener("click", abrirCarrito);

  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", validarFormulario);
  }

  console.log("🧊 Aquala iniciado correctamente");
});