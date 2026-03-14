import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./PosterSlider.css";

function PosterSlider() {
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
      title: "Food Distribution Drive",
      description: "Serving meals to families in need"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
      title: "Education Support Campaign",
      description: "Providing books and stationery to students"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800",
      title: "Clothing Donation Drive",
      description: "Warm clothes for winter season"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800",
      title: "Community Health Camp",
      description: "Free medical checkups and supplies"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="poster-slider">
      <div className="slider-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentIndex ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-overlay"></div>
            <div className="slide-content">
              <h3 className="slide-title">{slide.title}</h3>
              <p className="slide-description">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="slider-btn prev" onClick={goToPrevious}>
        <ChevronLeft />
      </button>
      <button className="slider-btn next" onClick={goToNext}>
        <ChevronRight />
      </button>

      <div className="slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default PosterSlider;