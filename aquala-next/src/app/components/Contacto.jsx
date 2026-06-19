'use client'
import { useState } from 'react'

const Contacto = () => {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' })
  const [notificacion, setNotificacion] = useState('')
  const [enviando, setEnviando] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEnviando(true)

    const res = await fetch('/api/contacto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const data = await res.json()

    if (!res.ok) {
      setNotificacion(`❌ ${data.error}`)
    } else {
      setNotificacion('✅ Mensaje enviado correctamente!')
      setForm({ nombre: '', email: '', mensaje: '' })
    }

    setEnviando(false)
    setTimeout(() => setNotificacion(''), 3000)
  }

  return (
    <section id="contacto" aria-label="Formulario de contacto">
      <h2>Contacto</h2>
      {notificacion && <div className="notificacion">{notificacion}</div>}
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
          type="text"
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
        <button type="submit" disabled={enviando}>
          {enviando ? 'Enviando...' : 'Enviar mensaje'}
        </button>
      </form>
    </section>
  )
}

export default Contacto