import { NextResponse } from 'next/server'
import { z } from 'zod'

// Caché en memoria (se resetea al reiniciar el servidor)
const ordenes = []
let nextId = 1

const ordenSchema = z.object({
  items: z.array(z.object({
    id: z.number(),
    nombre: z.string(),
    precio: z.number(),
    cantidad: z.number().min(1)
  })).min(1, 'El carrito no puede estar vacío'),
  nombre: z.string().min(1, 'El nombre es requerido'),
  email: z.string().email('Email inválido'),
})

export async function GET() {
  return NextResponse.json(ordenes)
}

export async function POST(request) {
  const body = await request.json()

  const resultado = ordenSchema.safeParse(body)

  if (!resultado.success) {
    return NextResponse.json(
      { error: resultado.error.errors[0].message },
      { status: 400 }
    )
  }

  const { items, nombre, email } = resultado.data

  const total = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

  const nuevaOrden = {
    id: nextId++,
    nombre,
    email,
    items,
    total,
    estado: 'pendiente',
    fecha: new Date().toISOString()
  }

  ordenes.push(nuevaOrden)

  return NextResponse.json(nuevaOrden, { status: 201 })
}