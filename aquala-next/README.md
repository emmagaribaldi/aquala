# 🧋 Aquala — E-commerce de Termos Premium

Aquala es una tienda online de termos premium desarrollada como proyecto final de la materia **Programación Web**. Permite a los usuarios explorar productos, agregar al carrito, realizar compras con Mercado Pago y recibir confirmación automática mediante webhooks.

---

## 🚀 Deploy

**Producción:** [aquala-jade.vercel.app](https://aquala-jade.vercel.app)  
**Repositorio:** [github.com/emmagaribaldi/Aquala](https://github.com/emmagaribaldi/Aquala)

---

## 🛠️ Stack Técnico

| Tecnología | Uso |
|---|---|
| **Next.js 16** (App Router) | Framework principal, SSR, Route Handlers |
| **Supabase** | Base de datos PostgreSQL |
| **Mercado Pago SDK** | Procesamiento de pagos |
| **Zod** | Validación de datos en el servidor |
| **Vercel** | Deploy y hosting |

---

## 📁 Estructura del Proyecto
aquala-next/src/

├── middleware.js

├── lib/

│   ├── supabase.js

│   └── mercadopago.js

└── app/

├── page.js

├── layout.js

├── globals.css

├── login/page.js

├── admin/

│   ├── page.jsx

│   └── ordenes/page.js

├── checkout/page.jsx

├── pago-completado/page.jsx

├── pago-fallido/page.jsx

├── pago-pendiente/page.jsx

├── api/

│   ├── productos/route.js

│   ├── productos/[id]/route.js

│   ├── contacto/route.js

│   ├── ordenes/route.js

│   ├── ordenes/[id]/route.js

│   ├── admin/stats/route.js

│   └── pagos/

│       ├── crear-preferencia/route.js

│       └── webhook/route.js

└── components/

├── ClientLayout.jsx

├── Header.jsx

├── Hero.jsx

├── Productos.jsx

├── Comentarios.jsx

├── Nosotros.jsx

├── Contacto.jsx

└── Footer.jsx

---

## 🗄️ Base de Datos (Supabase)

### Tablas

**`products`** — productos del catálogo con nombre, precio, descripción, imagen y stock

**`orders`** — órdenes de compra con nombre, email, total y estado

**`order_items`** — items de cada orden con referencia a producto, cantidad y precio

### Políticas RLS

- `products`: SELECT público
- `orders`: INSERT, SELECT y UPDATE públicos
- `order_items`: INSERT y SELECT públicos

---

## 🛒 Flujo de Compra
Usuario navega el catálogo
Agrega productos al carrito
"Finalizar compra" → ingresa nombre y email
POST /api/ordenes → se crea la orden en Supabase
Redirige a /checkout?orden_id=X
"Pagar con Mercado Pago" → POST /api/pagos/crear-preferencia
Redirige al checkout de MP
Usuario completa el pago
MP envía webhook a /api/pagos/webhook
Webhook verifica firma, actualiza orden y descuenta stock
Usuario es redirigido a /pago-completado

---

## 🔔 Webhooks — Mercado Pago

- **Verificación de firma**: valida `x-signature` con HMAC SHA256
- **Consulta a la API de MP**: verifica el estado real del pago
- **Actualización de estado**: actualiza `status` en Supabase
- **Actualización de stock**: descuenta stock al aprobar un pago
- **Manejo de reintentos**: evita procesar órdenes duplicadas

### Estados de pago

| Estado MP | Estado en BD |
|---|---|
| `approved` | `pagado` |
| `rejected` | `rechazado` |
| `pending` | `pendiente` |
| `in_process` | `en_proceso` |

---

## 🔐 Panel de Administración

Acceso en `/admin` — login en `/login`

- **Contraseña:** admin123

---

## 🧪 Testing con Sandbox de Mercado Pago

**Cuenta compradora de prueba:**
- Usuario: `TESTUSER5179115197534515569`
- Contraseña: `u7Wndb2ANL`

**Tarjeta de prueba (pago aprobado):**

| Campo | Valor |
|---|---|
| Número | 5031 7557 3453 0604 |
| Vencimiento | 11/30 |
| CVV | 123 |
| Nombre | APRO |
| DNI | 12345678 |

---

## 🌐 Testing local con ngrok

```powershell
# Terminal 1
cd aquala-next
npm run dev

# Terminal 2
& 'C:\Users\Emma\ngrok.exe' http 3000
```

Actualizar `notification_url` en `src/app/api/pagos/crear-preferencia/route.js` con la URL de ngrok.

---

## 📡 API Reference

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/productos` | Lista todos los productos |
| GET | `/api/productos/[id]` | Obtiene un producto por ID |
| POST | `/api/ordenes` | Crea una nueva orden |
| GET | `/api/ordenes` | Lista todas las órdenes |
| GET | `/api/ordenes/[id]` | Obtiene una orden con sus items |
| POST | `/api/contacto` | Envía formulario de contacto |
| GET | `/api/admin/stats` | Estadísticas del panel admin |
| POST | `/api/pagos/crear-preferencia` | Crea preferencia de pago en MP |
| POST | `/api/pagos/webhook` | Recibe notificaciones de MP |

---

## ⚙️ CI/CD y Deploy

- Cada `push` a `main` genera un deploy automático en Vercel
- Cada PR genera una **Preview URL** para revisión
- Root directory en Vercel: `aquala-next`

---

## 📋 Entregables

| Entregable | Descripción | Estado |
|---|---|---|
| E4 | Catálogo + API básica | ✅ |
| E5 | CRUD funcional en Supabase + admin | ✅ |
| E6 | Checkout + webhook funcionales | ✅ |

---

## 👩‍💻 Autora

**Emma Garibaldi**  
Programación Web — ITBA  
2026