'use client'
import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { Pagination, Autoplay } from 'swiper/modules';

const PopularProducts = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    fetch("allProducts.json")
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])
  const popularProducts = products.filter(product => product.bestSelling);


  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Popular Products</h2>
      <hr />
      <Swiper
        slidesPerView={1}
        spaceBetween={5}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper my-6"
      >
        {
          popularProducts.map((product, idx) => (
            <SwiperSlide key={idx}>
              <div className="rounded-xl border w-full shadow-md overflow-hidden flex flex-col h-[420px] m-3 transition hover:shadow-lg  p-2 ">
                {/* Fixed image height */}
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center rounded-lg"
                  />
                </div>

                {/* Card Body */}
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <p className="text-xs uppercase  mb-1">{product.category}</p>
                    <h2 className="text-lg font-semibold text-gray-800 truncate" title={product.name}>{product.name}</h2>
                    <p className="text-sm mt-1 line-clamp-2 h-[38px]">{product.shortDescription}</p>
                  </div>

                  {/* Price + Button */}
                  <div className="mt-auto">
                    <p className="text-blue-600 font-bold text-md mb-3">${product.price}</p>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))
        }

      </Swiper>
    </div>
  );
};

export default PopularProducts;