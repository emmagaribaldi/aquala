import { MercadoPagoConfig, Payment } from "mercadopago";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const mercadopago = new MercadoPagoConfig({
  accessToken: "APP_USR-5027008667036497-061721-4abe5bcea601c648cb215949f288cb21-3482398824",
});

const supabase = createClient(
  "https://eppukwxykjruiwrgyyob.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwcHVrd3h5a2pydWl3cmd5eW9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1NDA3MzEsImV4cCI6MjA5NzExNjczMX0.xIb0RaRFSYgo5I9NPtWev_iEL98OB348KalcuyhBiS4"
);

const WEBHOOK_SECRET = "ac96cef94a3904e63265e728d20f01232d6368a67ecf826254516dbee2fd2952";

function verificarFirma(request) {
  const xSignature = request.headers.get("x-signature");
  const xRequestId = request.headers.get("x-request-id");

  if (!xSignature || !xRequestId) return false;

  const params = new URLSearchParams(new URL(request.url).search);
  const dataId = params.get("data.id");

  const parts = xSignature.split(",");
  let ts, hash;
  for (const part of parts) {
    const [key, value] = part.trim().split("=");
    if (key === "ts") ts = value;
    if (key === "v1") hash = value;
  }

  if (!ts || !hash) return false;

  const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;
  const expected = crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(manifest)
    .digest("hex");

  return expected === hash;
}

async function actualizarStock(ordenId) {
  const { data: items, error } = await supabase
    .from("order_items")
    .select("product_id, cantidad")
    .eq("order_id", ordenId);

  if (error || !items) {
    console.error("Error obteniendo items de la orden:", error);
    return;
  }

  for (const item of items) {
    const { data: product } = await supabase
      .from("products")
      .select("stock")
      .eq("id", item.product_id)
      .single();

    if (!product) continue;

    const nuevoStock = Math.max(0, product.stock - item.cantidad);

    const { error: updateError } = await supabase
      .from("products")
      .update({ stock: nuevoStock })
      .eq("id", item.product_id);

    if (updateError) {
      console.error(`Error actualizando stock del producto ${item.product_id}:`, updateError);
    } else {
      console.log(`Stock producto ${item.product_id}: ${product.stock} → ${nuevoStock}`);
    }
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const xSignature = request.headers.get("x-signature");
    if (xSignature) {
      const firmaValida = verificarFirma(request);
      if (!firmaValida) {
        console.log("Firma inválida — webhook rechazado");
        return Response.json({ error: "Firma inválida" }, { status: 401 });
      }
      console.log("Firma verificada correctamente");
    } else {
      console.log("Webhook sin firma — procesando igual");
    }

    console.log("Webhook recibido:", JSON.stringify(body, null, 2));

    if (body.type !== "payment") {
      return Response.json({ received: true });
    }

    const paymentId = body.data?.id;
    if (!paymentId) {
      return Response.json({ error: "Sin payment_id" }, { status: 400 });
    }

    // Manejo de reintentos: verificar si ya procesamos este pago
    const { data: ordenExistente } = await supabase
      .from("orders")
      .select("status")
      .eq("id", `${paymentId}`)
      .single();

    const paymentClient = new Payment(mercadopago);
    let payment;
    let intentos = 0;
    const maxIntentos = 3;

    while (intentos < maxIntentos) {
      try {
        payment = await paymentClient.get({ id: paymentId });
        break;
      } catch (err) {
        intentos++;
        console.log(`Intento ${intentos} fallido, reintentando...`);
        if (intentos === maxIntentos) throw err;
        await new Promise((r) => setTimeout(r, 1000 * intentos));
      }
    }

    console.log("Estado del pago:", payment.status);
    console.log("Metadata:", payment.metadata);

    const ordenId = payment.metadata?.orden_id;
    if (!ordenId) {
      console.log("Sin orden_id en metadata");
      return Response.json({ received: true });
    }

    const estadoMap = {
      approved: "pagado",
      rejected: "rechazado",
      pending: "pendiente",
      in_process: "en_proceso",
    };

    const nuevoEstado = estadoMap[payment.status] || payment.status;

    const { data: ordenActual } = await supabase
      .from("orders")
      .select("status")
      .eq("id", ordenId)
      .single();

    // Evitar reprocesar si ya está pagado
    if (ordenActual?.status === "pagado") {
      console.log(`Orden ${ordenId} ya estaba pagada — ignorando reintento`);
      return Response.json({ received: true, status: "already_processed" });
    }

    const { error } = await supabase
      .from("orders")
      .update({ status: nuevoEstado })
      .eq("id", ordenId);

    if (error) {
      console.error("Error actualizando orden:", error);
      return Response.json({ error: "Error en DB" }, { status: 500 });
    }

    console.log(`Orden ${ordenId} actualizada a: ${nuevoEstado}`);

    // Actualizar stock solo si el pago fue aprobado
    if (payment.status === "approved") {
      await actualizarStock(ordenId);
    }

    return Response.json({ received: true, status: nuevoEstado });
  } catch (error) {
    console.error("Error en webhook:", error);
    return Response.json({ error: "Error interno" }, { status: 500 });
  }
}