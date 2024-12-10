import React, { useState } from 'react';
import './style.css';

function ImageScroll() {
  const images = [
    '/images/image1.png',
    '/images/image2.png',
    '/images/image3.png',
    '/images/image4.png',
    '/images/image5.png',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const selectImage = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="imageGallery">
      {/* 이미지 표시 */}
      <div className="imageContainer">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="galleryImage"
        />
      </div>

      {/* 이전/다음 버튼 */}
      <button className="prevButton" onClick={goToPrevious}>
        &lt;
      </button>
      <button className="nextButton" onClick={goToNext}>
        &gt;
      </button>

      {/* 인디케이터 */}
      <div className="indicatorContainer">
        {images.map((_, index) => (
          <button
            key={index}
            className={`indicator ${
              index === currentIndex ? 'active' : ''
            }`}
            onClick={() => selectImage(index)}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default ImageScroll;
