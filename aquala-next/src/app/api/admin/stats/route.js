import { NextResponse } from 'next/server'

// Importamos las órdenes del caché compartido
let ordenes = []

try {
  // En una app real esto vendría de la DB
  ordenes = global._ordenes || []
} catch {
  ordenes = []
}

export async function GET() {
  const totalOrdenes = ordenes.length
  const totalRecaudado = ordenes.reduce((acc, o) => acc + o.total, 0)
  const ordenesPendientes = ordenes.filter((o) => o.estado === 'pendiente').length

  return NextResponse.json({
    totalOrdenes,
    totalRecaudado,
    ordenesPendientes,
    productos: 3
  })
}