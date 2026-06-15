import { NextResponse } from 'next/server'

const productos = [
  {
    id: 1,
    nombre: "Aquala Classic Lavender",
    precio: 50000,
    descripcion: "600ml, tapa freesip, doble pared de acero inoxidable. Mantiene tu bebida fría 24hs y caliente 12hs.",
    imagen: "/classic.png",
    alt: "Termo Aquala Classic color lavanda con tapa freesip"
  },
  {
    id: 2,
    nombre: "Aquala Sway Cream",
    precio: 55000,
    descripcion: "800ml, asa de cuero, tapa freesip, doble pared de acero inoxidable. Diseñado para llevarlo a donde vayas.",
    imagen: "/sport.png",
    alt: "Termo Aquala Sway color crema con asa de cuero"
  },
  {
    id: 3,
    nombre: "Aquala SmoothSip Rosa",
    precio: 60000,
    descripcion: "1L, tapa con botón push, color rosa salmón con detalles grises. Perfecta para café, mate o agua fría.",
    imagen: "/pro.png",
    alt: "Termo Aquala SmoothSip color rosa salmón con tapa gris"
  }
]

export async function GET() {
  return NextResponse.json(productos)
}