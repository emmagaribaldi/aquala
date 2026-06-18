import { MercadoPagoConfig, Preference } from 'mercadopago'

const client = new MercadoPagoConfig({
  accessToken: 'APP_USR-5027008667036497-061721-4abe5bcea601c648cb215949f288cb21-3482398824',
})

export { client, Preference }