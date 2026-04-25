'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Autoplay } from 'swiper/modules'

export default function HeroSlider() {
  return (
    <div className="mb-6 md:mb-8">
      <Swiper
        spaceBetween={16}
        slidesPerView={1}
        loop
        modules={[Autoplay]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
      >

        {/* SLIDE 1 */}
        <SwiperSlide>
          <div
            className="
              relative 
              w-full 
              h-[180px] sm:h-[250px] md:h-[320px] lg:h-[400px]
              rounded-xl 
              overflow-hidden
            "
          >
            <Image 
              src="/imgs/promo.png" 
              alt="Promoção"
              fill
              className="object-contain"
              priority
            />
          </div>
        </SwiperSlide>

        {/* SLIDE 2 */}
        <SwiperSlide>
          <div className="relative w-full h-[180px] sm:h-[250px] md:h-[320px] lg:h-[400px] rounded-xl overflow-hidden">
            <Image 
              src="/imgs/rare.png" 
              alt="Cartas Raras"
              fill
              className="object-contain"
            />
          </div>
        </SwiperSlide>

        {/* SLIDE 3 */}
        <SwiperSlide>
          <div className="relative w-full h-[180px] sm:h-[250px] md:h-[320px] lg:h-[400px] rounded-xl overflow-hidden">
            <Image 
              src="/imgs/newcolection.png" 
              alt="Novas Coleções"
              fill
              className="object-contain"
            />
          </div>
        </SwiperSlide>

      </Swiper>
    </div>
  )
}