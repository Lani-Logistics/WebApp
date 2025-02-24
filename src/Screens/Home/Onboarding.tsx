import { Brand } from "@/Components/UI";
import { slides } from "@/Constants/data";
import { UserRoundPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Onboarding = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [touchStart, setTouchStart] = useState<number>(0);
    const [touchEnd, setTouchEnd] = useState<number>(0);
  
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, 3000);
  
      return () => clearInterval(timer);
    }, []);
  
    const handleTouchStart = (e: React.TouchEvent) => {
      setTouchStart(e.targetTouches[0].clientX);
    };
  
    const handleTouchMove = (e: React.TouchEvent) => {
      setTouchEnd(e.targetTouches[0].clientX);
    };
  
    const handleTouchEnd = () => {
      if (touchStart - touchEnd > 75) {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }
  
      if (touchStart - touchEnd < -75) {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      }
    };
  
    return (
      <>
        <div className="layout h-[100dvh] flex flex-col items-center justify-between py-10">
          <Brand />
  
          <div className=" flex flex-col gap-10">
            <div className="relative">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {slides.map((slide, index) => (
                    <div key={index} className="text-center min-w-full">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-48 h-48 mx-auto mb-6 object-contain"
                      />
                      <h2 className="text-2xl font-sora font-bold text-main capitalize">
                        {slide.title}
                      </h2>
                      <p className="text-sub text-sm">
                        {slide.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center gap-2 mt-4">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full bg-primary ${
                      currentSlide === index ? "opacity-100" : "opacity-40"
                    }`}
                  ></button>
                ))}
              </div>
            </div>
  
            <div className="flex md:flex-row flex-col gap-2 px-4">
              <Link
                to="/login"
                className="btn bg-primary text-white min-h-10 flex-1 rounded-full"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn bg-background gap-2 text-main min-h-10 flex-1 rounded-full"
              >
                <UserRoundPlus size={18}/>
                <span>Create new account</span>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
}

export default Onboarding