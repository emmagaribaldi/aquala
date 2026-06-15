import { NextResponse } from 'next/server'

const productos = [
  {
    id: 1,
    nombre: "Aquala Classic Lavender",
    precio: 50000,
    descripcion: "600ml, tapa freesip, doble pared de acero inoxidable. Mantiene tu bebida fría 24hs y caliente 12hs.",
    imagen: "/classic.png",
    alt: "Termo Aquala Classic color lavanda con tapa freesip",
    stock: 10
  },
  {
    id: 2,
    nombre: "Aquala Sway Cream",
    precio: 55000,
    descripcion: "800ml, asa de cuero, tapa freesip, doble pared de acero inoxidable. Diseñado para llevarlo a donde vayas.",
    imagen: "/sport.png",
    alt: "Termo Aquala Sway color crema con asa de cuero",
    stock: 8
  },
  {
    id: 3,
    nombre: "Aquala SmoothSip Rosa",
    precio: 60000,
    descripcion: "1L, tapa con botón push, color rosa salmón con detalles grises. Perfecta para café, mate o agua fría.",
    imagen: "/pro.png",
    alt: "Termo Aquala SmoothSip color rosa salmón con tapa gris",
    stock: 5
  }
]

export async function GET(request, context) {
  const params = await context.params
  const id = parseInt(params.id)
  const producto = productos.find((p) => p.id === id)

  if (!producto) {
    return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 })
  }

  return NextResponse.json(producto)
}