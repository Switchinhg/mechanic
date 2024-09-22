import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import styles from './Hero.module.css'
// Import Swiper styles
import 'swiper/css';
import { StarIcon, CheckIcon, ChevronLeftIcon, ChevronRightIcon, XIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
export default function Hero() {
  return (
//     <Swiper
//     spaceBetween={0}
//     slidesPerView={1}
//     loop={'true'}
//     autoplay={{
//         delay: 2500
//     }}
//     modules={[Autoplay]}
//     // onSlideChange={() => console.log('slide change')}
//     // onSwiper={(swiper) => console.log(swiper)}
//   >
//     <SwiperSlide>
//         <div className={hero.slide}>
//             Hola
//         </div>
//         </SwiperSlide>
//     <SwiperSlide>
//         <div className={hero.slide}>
//             Hola2
//         </div>
//     </SwiperSlide>
//     <SwiperSlide>
//         <div className={hero.slide}>
//             Hola3
//         </div>
//     </SwiperSlide>
//     <SwiperSlide>
//         <div className={hero.slide}>
//             Hola4
//         </div>
//     </SwiperSlide>
//   </Swiper>
<div className="min-h-screen bg-gray-100">
{/* Sección Hero */}
<section className={`${styles.hero_bg} text-white`}>
  <div className={`container mx-auto px-6 py-24 text-center ${styles.hero_height}`}>
    <h1 className="mb-4 text-4xl font-bold md:text-6xl">Revoluciona la Gestión de tu Taller</h1>
    <p className="mb-8 text-xl">Optimiza operaciones, aumenta la eficiencia y acelera el crecimiento con {process.env.NEXT_PUBLIC_APP_NAME}</p>
  </div>
</section>

{/* Sección de Características */}
<section className={`${styles.hero_bg } py-20`}>
  <div className="container mx-auto px-6">
    <h2 className={`${styles.text } mb-12 text-center text-3xl font-bold`}>¿Por qué elegir {process.env.NEXT_PUBLIC_APP_NAME}?</h2>
    <div className="grid gap-8 md:grid-cols-3">
      {[
        {
          title: 'Inventario Optimizado',
          description: 'Gestiona sin esfuerzo tu inventario de coches con actualizaciones en tiempo real y capacidades de búsqueda avanzadas.',
        },
        {
          title: 'Gestión de Clientes',
          description: 'Mantén un registro de las interacciones con los clientes, sus preferencias y el historial de servicios en un solo lugar.',
        },
        {
          title: 'Programación Automatizada',
          description: 'Optimiza la eficiencia de tu taller con nuestro sistema inteligente de programación para servicios y reparaciones.',
        },
      ].map((feature, index) => (
        <div key={index} className="rounded-lg bg-white p-6 shadow-md">
          <h3 className={`${styles.text_aways_dark} mb-3 text-xl font-semibold`}>{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>

{/* Sección de Precios */}
<section id="pricing" className={ `${styles.hero_bg} py-20`}>
  <div className="container mx-auto px-6">
    <h2 className={`${styles.text}  mb-12 text-center text-3xl font-bold`}>Elige tu Plan</h2>
    <div className="grid gap-8 md:grid-cols-3">
      {[
        {
          title: 'Gratis',
          price: '$0',
          features: ['Gestión básica de inventario', 'Hasta 50 vehículos', 'Soporte por correo electrónico'],
        },
        {
          title: 'Taller Pequeño',
          price: '$99/mes',
          features: ['Gestión avanzada de inventario', 'Hasta 200 vehículos', 'Gestión de clientes', 'Soporte prioritario por correo'],
        },
        {
          title: 'Taller Grande',
          price: '$299/mes',
          features: ['Inventario a nivel empresarial', 'Vehículos ilimitados', 'Análisis avanzados', 'Soporte telefónico 24/7'],
        },
      ].map((plan, index) => (
        <div key={index} className="flex flex-col rounded-lg bg-white p-6 shadow-md">
          <h3 className={`${styles.text_aways_dark} mb-4 text-2xl font-bold`}>{plan.title}</h3>
          <p className={`${styles.text_aways_dark} mb-6 text-4xl font-bold`}>{plan.price}</p>
          <ul className="mb-8 flex-grow space-y-2">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-center">
                <CheckIcon className="mr-2 h-5 w-5 text-green-500" />
                <p className={styles.text_aways_dark}>{feature}</p>
              </li>
            ))}
          </ul>
          <Button
            onClick={() => setIsLoginModalOpen(true)}
            className="w-full rounded-full bg-blue-600 px-6 py-2 text-center font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Elegir Plan
          </Button>
        </div>
      ))}
    </div>
  </div>
</section>

{/* Sección de Carrusel de Reseñas */}



{/* Sección CTA de Prueba Gratuita */}
{/* <section className="bg-blue-600 py-20 text-white">
  <div className="container mx-auto px-6 text-center">
    <h2 className="mb-4 text-3xl font-bold">¿Listo para Transformar tu Taller?</h2>
    <p className="mb-8 text-xl">Comienza tu prueba gratuita de 14 días hoy. No se requiere tarjeta de crédito.</p>
     <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
      <Input
        type="email"
        placeholder="Ingresa tu correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black sm:w-64"
        required
      />
      <Button
        type="submit"
        className="w-full rounded-full bg-white px-6 py-2 font-semibold text-blue-600 transition-colors hover:bg-blue-100 sm:w-auto"
      >
        Iniciar Prueba Gratuita
      </Button>
    </form> 
  </div>
</section> */}

{/* Pie de página */}
<footer className="bg-gray-800 py-8 text-white">
  <div className="container mx-auto px-6 text-center">
    <p>&copy; 2024 msTaller. Todos los derechos reservados.</p>
  </div>
</footer>
</div>
  )
}
