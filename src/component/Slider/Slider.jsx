"use client"
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


const Slider = () => {
    return (
        <Swiper
        slidesPerView={1}
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay,Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><img src="https://img.lazcdn.com/us/domino/2a2e0182-949c-4731-be42-76f1b5c1561f_BD-1976-688.jpg_2200x2200q80.jpg_.webp" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://img.lazcdn.com/us/domino/db8225ff-d494-4566-8752-c90366486de2_BD-1976-688.jpg_2200x2200q80.jpg_.webp" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://img.lazcdn.com/us/domino/78cf77c3-aabc-44bc-a751-2dd6698411f8_BD-1976-688.jpg_2200x2200q80.jpg_.webp" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://img.lazcdn.com/us/domino/167702a1-362b-4502-8acd-c465bab725f0_BD-1976-688.jpg_2200x2200q80.jpg_.webp" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://img.lazcdn.com/us/domino/a798b64f-23b3-4091-a33a-1bf9e2ae0b0d_BD-1976-688.jpg_2200x2200q80.jpg_.webp" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://img.lazcdn.com/us/domino/b0504e74-d0e3-4f98-bcfe-efbf1bfeb748_BD-1976-688.jpg_2200x2200q80.jpg_.webp" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://img.lazcdn.com/us/domino/8eefce42-46aa-4a08-b12c-822a712bb43f_BD-1976-688.jpg_2200x2200q80.jpg_.webp" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://img.lazcdn.com/us/domino/12dfcabb-afbb-4922-929e-2c0b8a53b20a_BD-1976-688.jpg_2200x2200q80.jpg_.webp" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://img.lazcdn.com/us/domino/b7c3daf7-c1ef-4728-a7aa-6a2e02525e60_BD-1976-688.jpg_2200x2200q80.jpg_.webp" alt="" /></SwiperSlide>
      </Swiper>
    );
};

export default Slider;