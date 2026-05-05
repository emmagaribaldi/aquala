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

// ===== CARRITO =====
const agregarAlCarrito = (id, nombre, precio) => {
  const itemExistente = carrito.find((item) => item.id === id);

  if (itemExistente) {
    itemExistente.cantidad++;
  } else {
    carrito.push({ id, nombre, precio, cantidad: 1 });
  }

  mostrarNotificacion(`✅ ${nombre} agregado al carrito`);
  actualizarContadorCarrito();
  console.log("Carrito actual:", carrito);
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
    background: #0077b6;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    font-weight: 600;
    z-index: 999;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  `;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 3000);
};

const actualizarContadorCarrito = () => {
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  let contador = document.getElementById("carrito-contador");

  if (!contador) {
    contador = document.createElement("span");
    contador.id = "carrito-contador";
    contador.style.cssText = `
      background: #00b4d8;
      color: white;
      border-radius: 50%;
      padding: 0.1rem 0.5rem;
      font-size: 0.8rem;
      margin-left: 0.5rem;
    `;
    document.querySelector(".logo").appendChild(contador);
  }

  contador.textContent = totalItems;
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
  cargarProductos();

  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", validarFormulario);
  }

  console.log("🧊 Aquala iniciado correctamente");
});