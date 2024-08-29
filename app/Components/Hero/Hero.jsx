import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import styles from './Hero.module.css'
// Import Swiper styles
import 'swiper/css';

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
<div className={styles.container}>
<header className={styles.hero}>
  <h1 className={styles.title}>Gestor de Talleres Mecánicos</h1>
  <p className={styles.subtitle}>
    Gestiona tu taller y crea una tienda online personalizada.
  </p>
  <button className={styles.ctaButton}>Comenzar Gratis</button>
</header>

<section className={styles.features}>
  <h2 className={styles.sectionTitle}>Características</h2>
  <div className={styles.featuresList}>
    <div className={styles.featureItem}>
      <h3>Gestión Completa</h3>
      <p>Organiza y controla todos los aspectos de tu taller desde una sola plataforma.</p>
    </div>
    <div className={styles.featureItem}>
      <h3>Tienda Personalizada</h3>
      <p>Crea y gestiona una tienda online adaptada a tu negocio.</p>
    </div>
    <div className={styles.featureItem}>
      <h3>Informes Detallados</h3>
      <p>Accede a informes que te ayudarán a tomar mejores decisiones.</p>
    </div>
  </div>
</section>

<section className={styles.pricing}>
  <h2 className={styles.sectionTitle}>Planes y Precios</h2>
  <div className={styles.pricingTiers}>
    <div className={styles.pricingCard}>
      <h3>Free</h3>
      <p>$0 / mes</p>
      <ul>
        <li>Hasta 5 vehículos</li>
        <li>Gestión básica de trabajos</li>
        <li>Tienda personalizada</li>
      </ul>
      <button className={styles.pricingButton}>Comenzar</button>
    </div>
    <div className={styles.pricingCard}>
      <h3>Pro</h3>
      <p>$29 / mes</p>
      <ul>
        <li>Gestión completa de taller</li>
        <li>Tienda personalizada avanzada</li>
        <li>Soporte premium</li>
      </ul>
      <button className={styles.pricingButton}>Obtener Pro</button>
    </div>
    <div className={styles.pricingCard}>
      <h3>Enterprise</h3>
      <p>$99 / mes</p>
      <ul>
        <li>Todo en Pro</li>
        <li>Soporte dedicado 24/7</li>
        <li>Funciones personalizadas</li>
      </ul>
      <button className={styles.pricingButton}>Contactar</button>
    </div>
  </div>
</section>

<section className={styles.testimonials}>
  <h2 className={styles.sectionTitle}>Lo que dicen nuestros clientes</h2>
  <div className={styles.testimonialList}>
    <div className={styles.testimonialItem}>
      <p>"Esta plataforma ha transformado mi taller. Es fácil de usar y la tienda online es un plus."</p>
      <h4>- Juan Pérez, Taller ABC</h4>
    </div>
    <div className={styles.testimonialItem}>
      <p>"La mejor inversión que he hecho para mi negocio. El soporte es excelente."</p>
      <h4>- María López, Mecánica XYZ</h4>
    </div>
  </div>
</section>

<section className={styles.ctaSection}>
  <h2 className={styles.sectionTitle}>¿Listo para llevar tu taller al siguiente nivel?</h2>
  <button className={styles.ctaButtonLarge}>Prueba Gratis Ahora</button>
</section>

<footer className={styles.footer}>
  <p>© 2024 Gestor de Talleres Mecánicos. Todos los derechos reservados.</p>
</footer>
</div>
  )
}
