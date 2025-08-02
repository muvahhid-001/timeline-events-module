import { useEffect, useState, useRef } from "react";
import { switchFadeAnimation } from "@/shared/lib/animations/switchFadeAnimation";
import { Swiper as SwiperType } from "swiper";
import { YearPoint } from "@/entities/TimePeriod/types";

export const useSwiperAnimation = (
  activeId: number,
  swiperRef: React.MutableRefObject<SwiperType | null>,
  swiperWrapperRef: React.RefObject<HTMLDivElement | null>,
  setInternalActiveId: (id: number) => void,
  onChange: (period: YearPoint) => void,
  years: YearPoint[]
) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const prevActiveIdRef = useRef<number>(activeId);

  useEffect(() => {
    const animate = async () => {
      const wrapper = swiperWrapperRef.current;
      if (!wrapper || prevActiveIdRef.current === activeId) return;

      setIsAnimating(true);
      await switchFadeAnimation(wrapper);
      setInternalActiveId(activeId);
      const index = years.findIndex((y) => y.id === activeId);
      if (index >= 0) {
        swiperRef.current?.slideTo(index);
      }
      const activePeriod = years.find((y) => y.id === activeId);
      if (activePeriod) onChange(activePeriod);
      swiperRef.current?.update();
      swiperRef.current?.pagination?.render();
      swiperRef.current?.pagination?.update();
      prevActiveIdRef.current = activeId;
      setIsAnimating(false);
    };

    animate();
  }, [activeId]);

  return isAnimating;
};
