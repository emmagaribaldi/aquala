import { useState } from "react"

const Contacto = () => {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" })
  const [notificacion, setNotificacion] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.nombre || !form.email || !form.mensaje) {
      setNotificacion("❌ Por favor completá todos los campos")
      setTimeout(() => setNotificacion(""), 3000)
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      setNotificacion("❌ El email no es válido")
      setTimeout(() => setNotificacion(""), 3000)
      return
    }

    setNotificacion("✅ Mensaje enviado correctamente!")
    setForm({ nombre: "", email: "", mensaje: "" })
    setTimeout(() => setNotificacion(""), 3000)
  }

  return (
    <section id="contacto" aria-label="Formulario de contacto">
      <h2>Contacto</h2>

      {notificacion && (
        <div className="notificacion">{notificacion}</div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Tu nombre"
          value={form.nombre}
          onChange={handleChange}
          required
          aria-required="true"
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="tu@email.com"
          value={form.email}
          onChange={handleChange}
          required
          aria-required="true"
        />

        <label htmlFor="mensaje">Mensaje</label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows="4"
          placeholder="Tu mensaje..."
          value={form.mensaje}
          onChange={handleChange}
          required
          aria-required="true"
        />

        <button type="submit">Enviar mensaje</button>
      </form>
    </section>
  )
}

export default Contacto