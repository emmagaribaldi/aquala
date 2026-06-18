import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request, context) {
  const params = await context.params
  const id = parseInt(params.id)

  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('id', id)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Orden no encontrada' }, { status: 404 })
  }

  return NextResponse.json(data)
}