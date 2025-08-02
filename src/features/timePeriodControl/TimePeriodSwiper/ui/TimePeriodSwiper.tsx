import React, { FC, useRef, useCallback, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { useSwiperAnimation } from "@/features/timePeriodControl/TimePeriodSwiper/lib/useSwiperAnimation";
import { YearSlide } from "@/shared/ui/YearSlide/YearSlide";
import { YearPoint } from "@/entities/TimePeriod/types";
import styles from "./TimePeriodSwiper.module.scss";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

interface Props {
  years: YearPoint[];
  activeId: number;
  onChange: (period: YearPoint) => void;
}

const TimePeriodSwiper: FC<Props> = ({ years, activeId, onChange }) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const swiperWrapperRef = useRef<HTMLDivElement | null>(null);
  const [internalActiveId, setInternalActiveId] = useState(activeId);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(
    window.innerWidth <= 900 ? 2 : 3
  );

  const isAnimating = useSwiperAnimation(
    activeId,
    swiperRef,
    swiperWrapperRef,
    setInternalActiveId,
    onChange,
    years
  );

  const handleSwiperInit = useCallback((instance: SwiperType) => {
    swiperRef.current = instance;
    setIsBeginning(instance.isBeginning);
    setIsEnd(instance.isEnd);
    instance.update();
    instance.pagination?.render();
    instance.pagination?.update();
  }, []);

  const handleSlideChange = useCallback(() => {
    if (!swiperRef.current) return;
    setIsBeginning(swiperRef.current.isBeginning);
    setIsEnd(swiperRef.current.isEnd);
  }, []);

  const handlePrev = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(window.innerWidth <= 900 ? 2 : 3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        {!isBeginning && (
          <button
            onClick={handlePrev}
            className={`${styles.navButton} ${styles.left}`}
          >
            {"<"}
          </button>
        )}
        <Swiper
          key={slidesPerView}
          spaceBetween={20}
          slidesPerView={slidesPerView}
          onSwiper={handleSwiperInit}
          onSlideChange={handleSlideChange}
          modules={[Pagination]}
          pagination={{ clickable: true, el: ".swiper-pagination" }}
          observeParents
          watchSlidesProgress
          className={styles.swiper}
        >
          {mappedSlides}
        </Swiper>
        {!isEnd && (
          <button
            onClick={handleNext}
            className={`${styles.navButton} ${styles.right}`}
          >
            {">"}
          </button>
        )}
      </div>
      <div className="swiper-pagination" />
    </div>
  );
};

export default React.memo(TimePeriodSwiper);
