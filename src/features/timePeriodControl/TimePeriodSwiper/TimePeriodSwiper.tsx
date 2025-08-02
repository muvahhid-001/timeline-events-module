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
  const prevActiveIdRef = useRef<number>(activeId);
  const [internalActiveId, setInternalActiveId] = useState(activeId);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(
    window.innerWidth <= 900 ? 2 : 3
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

  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(window.innerWidth <= 900 ? 2 : 3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const animateAndSwitch = async () => {
      const wrapper = swiperWrapperRef.current;
      if (!wrapper || prevActiveIdRef.current === activeId) return;

      setIsAnimating(true);
      await switchFadeAnimation(wrapper);
      setInternalActiveId(activeId);
      swiperRef.current?.slideTo(0);
      swiperRef.current?.update();
      swiperRef.current?.pagination?.render();
      swiperRef.current?.pagination?.update();
      prevActiveIdRef.current = activeId;
      setIsBeginning(true);
      setIsEnd(swiperRef.current?.isEnd ?? false);
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
