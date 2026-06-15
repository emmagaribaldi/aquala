import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { z } from 'zod'

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
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
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

  const { data: orden, error: ordenError } = await supabase
    .from('orders')
    .insert({ nombre, email, total, estado: 'pendiente' })
    .select()
    .single()

  if (ordenError) {
    return NextResponse.json({ error: ordenError.message }, { status: 500 })
  }

  const orderItems = items.map((item) => ({
    order_id: orden.id,
    product_id: item.id,
    nombre: item.nombre,
    precio: item.precio,
    cantidad: item.cantidad,
  }))

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems)

  if (itemsError) {
    return NextResponse.json({ error: itemsError.message }, { status: 500 })
  }

  return NextResponse.json(orden, { status: 201 })
}