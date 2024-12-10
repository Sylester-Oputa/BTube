import { useState, useEffect } from "react";
import { FaChevronUp } from "react-icons/fa";


const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show the button when the user scrolls down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="aspect-[1/1] md:h-14 h-12 hover:scale-[108%] duration-200 fixed bottom-5 right-5 p-3 bg-[#DA8A85] rounded-full shadow-lg hover:bg-[#D46C6C] transition ease-in-out"
          aria-label="Scroll to top"
        >
          <FaChevronUp className="text-[#101B28] text-md sm:text-lg" />
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
