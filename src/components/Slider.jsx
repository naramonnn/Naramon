import React, { useState } from 'react';

const sliderData = [
  {
    id: 1,
    image: '/assets/images/family by choice.jpg',
    title: 'Family by Choice',
  },
  {
    id: 2,
    image: '/assets/images/no gain no love.jpg',
    title: 'no gain no loven',
  },
  {
    id: 3,
    image: '/assets/images/5.png',
    title: 'dreaming of a freaking fairy tale',
  },
];

export default function Slider() {
  const [current, setCurrent] = useState(0);
  const length = sliderData.length;

  const nextSlide = () => setCurrent((prev) => (prev + 1) % length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + length) % length);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex transition-transform duration-500"
           style={{ transform: `translateX(-${current * 100}%)` }}>
        {sliderData.map((slide) => (
          <div key={slide.id} className="min-w-full h-96 flex justify-center items-center bg-gray-100">
            <img src={slide.image} alt={slide.title} className="h-full object-contain" />
          </div>
        ))}
      </div>
      <button onClick={prevSlide} className="absolute top-1/2 left-4 text-3xl z-10">&#10094;</button>
      <button onClick={nextSlide} className="absolute top-1/2 right-4 text-3xl z-10">&#10095;</button>
    </div>
  );
}