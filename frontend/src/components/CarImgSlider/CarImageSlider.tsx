import { useState } from "react";
import "./CarImageSlider.css";

type CarImageSliderProps = {
  images?: string[];
  alt: string;
};

export default function CarImageSlider({
  images = [],
  alt,
}: CarImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasImages = images.length > 0;
  const currentImage = hasImages ? images[currentIndex] : "";

  const handlePrev = () => {
    if (!hasImages) return;

    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (!hasImages) return;

    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="car-slider">
      {hasImages ? (
        <>
          <img src={currentImage} alt={alt} className="car-slider-image" />

          {images.length > 1 && (
            <>
              <button
                type="button"
                className="car-slider-btn prev"
                onClick={handlePrev}
                aria-label="Imagine anterioară"
              >
                ‹
              </button>

              <button
                type="button"
                className="car-slider-btn next"
                onClick={handleNext}
                aria-label="Imagine următoare"
              >
                ›
              </button>

              <div className="car-slider-counter">
                {currentIndex + 1} / {images.length}
              </div>
            </>
          )}
        </>
      ) : (
        <div className="car-slider-empty">
          <span>Fără imagine</span>
        </div>
      )}
    </div>
  );
}
