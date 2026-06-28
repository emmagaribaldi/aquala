'use client'
import { useState } from 'react'

const Comentarios = () => {
  const [form, setForm] = useState({ nombre: '', comentario: '' })
  const [comentarios, setComentarios] = useState([])
  const [enviando, setEnviando] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.nombre || !form.comentario) return
    setEnviando(true)
    setTimeout(() => {
      setComentarios([{ nombre: form.nombre, comentario: form.comentario }, ...comentarios])
      setForm({ nombre: '', comentario: '' })
      setEnviando(false)
    }, 500)
  }

  return (
    <section id="comentarios" className="comentarios-seccion">
      <div className="comentarios-contenido">
        <h2>Dejá tu comentario</h2>
        <p className="comentarios-subtitulo">¿Ya probaste Aquala? Contanos tu experiencia.</p>

        <form onSubmit={handleSubmit} className="comentario-form">
          <input
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
          <textarea
            name="comentario"
            placeholder="¿Qué te pareció Aquala?"
            rows="3"
            value={form.comentario}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={enviando}>
            {enviando ? 'Enviando...' : 'Agregar comentario'}
          </button>
        </form>

        {comentarios.length > 0 && (
          <div className="comentarios-lista">
            {comentarios.map((c, i) => (
              <div key={i} className="comentario-card">
                <p className="comentario-texto">"{c.comentario}"</p>
                <p className="comentario-autor">— {c.nombre}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Comentarios