import Header from './components/Header'
import Hero from './components/Hero'
import Productos from './components/Productos'
import Contacto from './components/Contacto'
import Footer from './components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Productos />
        <Contacto />
      </main>
      <Footer />
    </>
  )
}