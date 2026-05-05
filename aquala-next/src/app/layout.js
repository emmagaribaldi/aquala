import './globals.css'

export const metadata = {
  title: 'Aquala – Termos Premium',
  description: 'E-commerce de termos premium inspirado en Stanley y Owala',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}