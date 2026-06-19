import { NextResponse } from 'next/server'
import { z } from 'zod'

const contactoSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido').max(100),
  email: z.string().email('Email inválido'),
  mensaje: z.string().min(1, 'El mensaje es requerido').max(1000),
})

export async function POST(request) {
  const body = await request.json()

  const resultado = contactoSchema.safeParse(body)

  if (!resultado.success) {
    return NextResponse.json(
      { error: resultado.error.issues?.[0]?.message || 'Datos inválidos' },
      { status: 400 }
    )
  }

  console.log('Nuevo mensaje de contacto:', resultado.data)

  return NextResponse.json({ mensaje: 'Mensaje enviado correctamente' })
}