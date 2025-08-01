import React, {
  FC,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { switchFadeAnimation } from "@/shared/lib/animations/switchFadeAnimation";
import { YearSlide } from "@/shared/ui/YearSlide/YearSlide";
import { YearPoint } from "@/entities/TimePeriod/types";
import styles from "./TimePeriodSwiper.module.scss";
import "swiper/css";

interface Props {
  years: YearPoint[];
  activeId: number;
  onChange: (period: YearPoint) => void;
}

const TimePeriodSwiper: FC<Props> = ({ years, activeId, onChange }) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const swiperWrapperRef = useRef<HTMLDivElement | null>(null);
  const prevActiveIdRef = useRef<number>(activeId);
  const [internalActiveId, setInternalActiveId] = useState(activeId);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSwiperInit = useCallback((instance: SwiperType) => {
    swiperRef.current = instance;
  }, []);

  useEffect(() => {
    const animateAndSwitch = async () => {
      const wrapper = swiperWrapperRef.current;
      if (!wrapper || prevActiveIdRef.current === activeId) return;

      setIsAnimating(true);
      await switchFadeAnimation(wrapper);
      setInternalActiveId(activeId);
      swiperRef.current?.slideTo(0);
      prevActiveIdRef.current = activeId;
      setIsAnimating(false);
    };

    animateAndSwitch();
  }, [activeId]);

  const renderSlide = useCallback(
    (year: YearPoint) => (
      <SwiperSlide key={year.id}>
        <YearSlide year={year} isActive={year.id === internalActiveId} />
      </SwiperSlide>
    ),
    [internalActiveId]
  );

  const mappedSlides = useMemo(
    () => years.map(renderSlide),
    [years, renderSlide]
  );

  return (
    <div className={styles.wrapper}>
      <div
        ref={swiperWrapperRef}
        className={styles.swiperWrapper}
        style={{ opacity: isAnimating ? 0 : 1 }}
      >
        <Swiper
          spaceBetween={20}
          slidesPerView={3}
          onSwiper={handleSwiperInit}
          className={styles.swiper}
        >
          {mappedSlides}
        </Swiper>
      </div>
    </div>
  );
};

export default React.memo(TimePeriodSwiper);
