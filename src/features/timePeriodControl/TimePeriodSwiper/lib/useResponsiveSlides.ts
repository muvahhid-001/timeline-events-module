import { useEffect, useState } from "react";

export const useResponsiveSlides = () => {
  const [slidesPerView, setSlidesPerView] = useState(
    window.innerWidth <= 900 ? 2 : 3
  );

  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(window.innerWidth <= 900 ? 2 : 3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return slidesPerView;
};
