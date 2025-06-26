'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaStar } from 'react-icons/fa';


const CustomerReview = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('/CustomerReview.json')
            .then(res => res.json())
            .then(data => setReviews(data));
    }, []);
 
    return (
        <div className="py-10 px-4">
            <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>

            <Swiper
                slidesPerView={1}
                spaceBetween={20}
                loop={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                modules={[ Autoplay]}
                className="w-full  mx-auto"
            >
                {reviews.map((review, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="w-full max-h-full bg-white shadow-md rounded-xl overflow-hidden p-4 flex flex-col items-stretch border justify-between text-center">
                            <div className="flex flex-col items-center">
                                <img
                                    src={review.profileImage}
                                    alt={review.name}
                                    className="w-10 h-10 rounded-full object-cover mb-3"
                                />
                                <h3 className="text-base font-semibold text-gray-800">{review.name}</h3>
                                <p className="text-xs text-gray-500 mb-2">{review.product}</p>
                            </div>

                            <p className="text-sm text-gray-600 grow overflow-hidden">{review.review}</p>

                            <div className="flex justify-center mt-3">
                                {Array.from({ length: review.rating }, (_, i) => (
                                    <svg
                                        key={i}
                                        className="w-5 h-5 text-yellow-500 fill-current"
                                        viewBox="0 0 20 20"
                                    >
                                        {/* <path d="M10 15l-5.878 3.09L5.67 12.18.79 7.91l6.09-.89L10 1l3.12 6.02 6.09.89-4.88 4.27 1.548 5.91z" /> */}
                                        <FaStar></FaStar>
                                    </svg>
                                ))}
                            </div>
                        </div>
                    </SwiperSlide>

                ))}
            </Swiper>
        </div>
    );
};

export default CustomerReview;