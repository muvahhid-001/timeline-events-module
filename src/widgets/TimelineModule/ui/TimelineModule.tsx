import { FC, useState, useMemo, Suspense, lazy } from "react";
import styles from "./TimelineModule.module.scss";
import { mockYears } from "@/entities/TimePeriod/model/__mocks__/year.mock";
import { FallbackCircle } from "@/shared/ui/FallbackCircle/FallbackCircle";
import TimeCircleSwitcher from "@/features/timePeriodControl/TimeCircleSwitcher/ui/TimeCircleSwitcher";
import { TimePeriodNavigate } from "@/features/timePeriodControl/TimePeriodNavigate/ui/TimePeriodNavigate";
import TimeControlButton from "@/features/timePeriodControl/TimeControlButton/ui/TimeControlButton";

const TimePeriodSwiper = lazy(
  () =>
    import("@/features/timePeriodControl/TimePeriodSwiper/ui/TimePeriodSwiper")
);

const TimelineModule: FC = () => {
  const [activePeriod, setActivePeriod] = useState(mockYears[0]);

  const currentIndex = useMemo(
    () => mockYears.findIndex((y) => y.id === activePeriod.id),
    [activePeriod]
  );

  const reorderedYears = useMemo(
    () => [activePeriod, ...mockYears.filter((y) => y.id !== activePeriod.id)],
    [activePeriod]
  );

  const handleChange = (period: typeof activePeriod) => {
    setActivePeriod(period);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setActivePeriod(mockYears[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < mockYears.length - 1) {
      setActivePeriod(mockYears[currentIndex + 1]);
    }
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Исторические даты</h2>
      <TimeCircleSwitcher
        years={mockYears}
        activeId={activePeriod.id}
        onSelect={(id) => {
          const next = mockYears.find((y) => y.id === id);
          if (next) setActivePeriod(next);
        }}
      />
      <TimePeriodNavigate period={activePeriod} />
      <TimeControlButton
        current={currentIndex + 1}
        total={mockYears.length}
        onPrev={handlePrev}
        onNext={handleNext}
        isPrevDisabled={currentIndex === 0}
        isNextDisabled={currentIndex === mockYears.length - 1}
      />
      <Suspense fallback={<FallbackCircle />}>
        <TimePeriodSwiper
          years={reorderedYears}
          activeId={activePeriod.id}
          onChange={handleChange}
        />
      </Suspense>
    </section>
  );
};

export default TimelineModule;
