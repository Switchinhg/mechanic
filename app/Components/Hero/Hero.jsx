import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import hero from './Hero.module.css'
// Import Swiper styles
import 'swiper/css';

export default function Hero() {
  return (
    <Swiper
    spaceBetween={0}
    slidesPerView={1}
    loop={'true'}
    autoplay={{
        delay: 2500
    }}
    modules={[Autoplay]}
    // onSlideChange={() => console.log('slide change')}
    // onSwiper={(swiper) => console.log(swiper)}
  >
    <SwiperSlide>
        <div className={hero.slide}>
            Hola
        </div>
        </SwiperSlide>
    <SwiperSlide>
        <div className={hero.slide}>
            Hola2
        </div>
    </SwiperSlide>
    <SwiperSlide>
        <div className={hero.slide}>
            Hola3
        </div>
    </SwiperSlide>
    <SwiperSlide>
        <div className={hero.slide}>
            Hola4
        </div>
    </SwiperSlide>
  </Swiper>
  )
}
