import { useCallback, useState } from "react";
import { Swiper as SwiperType } from "swiper";

export const useSwiperNavigation = () => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const updateEdges = (swiper?: SwiperType | null) => {
    if (!swiper) return;
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handleSlideChange = (swiper?: SwiperType | null) => () => {
    updateEdges(swiper);
  };

  const handleInit = (swiper: SwiperType) => {
    updateEdges(swiper);
    swiper.update();
    swiper.pagination?.render();
    swiper.pagination?.update();
  };

  return {
    isBeginning,
    isEnd,
    handleInit,
    handleSlideChange,
  };
};
