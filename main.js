// ===== DATOS DE PRODUCTOS =====
const productos = [
  {
    id: 1,
    nombre: "Aquala Classic",
    precio: 15999,
    descripcion: "El termo esencial. 600ml, doble pared de acero inoxidable.",
  },
  {
    id: 2,
    nombre: "Aquala Sport",
    precio: 19999,
    descripcion: "Diseñado para el movimiento. 800ml, tapa con pico.",
  },
  {
    id: 3,
    nombre: "Aquala Pro",
    precio: 24999,
    descripcion: "El más resistente. 1L, ideal para aventuras extremas.",
  },
];

// ===== CARRITO =====
let carrito = [];

// ===== FUNCIONES =====

// Formatear precio en pesos argentinos
const formatearPrecio = (precio) => {
  return `$${precio.toLocaleString("es-AR")}`;
};

// Agregar producto al carrito
const agregarAlCarrito = (id) => {
  const producto = productos.find((p) => p.id === id);
  const itemExistente = carrito.find((item) => item.id === id);

  if (itemExistente) {
    itemExistente.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  mostrarNotificacion(`✅ ${producto.nombre} agregado al carrito`);
  actualizarContadorCarrito();
  console.log("Carrito actual:", carrito);
};

// Mostrar notificación
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

// Actualizar contador del carrito en el nav
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

// ===== FORMULARIO DE CONTACTO =====
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
  // Conectar botones de carrito con productos
  const botones = document.querySelectorAll(".producto-card button");
  botones.forEach((boton, index) => {
    boton.addEventListener("click", () => agregarAlCarrito(index + 1));
  });

  // Conectar formulario
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", validarFormulario);
  }

  console.log("🧊 Aquala iniciado correctamente");
  console.log("Productos disponibles:", productos.map(p => p.nombre));
});