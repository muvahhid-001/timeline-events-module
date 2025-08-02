import { FC } from "react";

import { useTimePeriod } from "@/widgets/TimelineModule/lib/useTimePeriod";
import styles from "./TimelineModule.module.scss";
import { TimeCircleSwitcher } from "@/features/timePeriodControl/TimeCircleSwitcher/ui/TimeCircleSwitcher";
import TimePeriodNavigate from "@/features/timePeriodControl/TimePeriodNavigate/ui/TimePeriodNavigate";
import TimeControlButton from "@/features/timePeriodControl/TimeControlButton/TimeControlButton";
import { TimePeriodSwiper } from "@/features/timePeriodControl/TimePeriodSwiper";

const TimelineModule: FC = () => {
  const {
    activePeriod,
    currentIndex,
    reorderedYears,
    handleChange,
    handlePrev,
    handleNext,
    total,
    setActiveById,
  } = useTimePeriod();

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Исторические даты</h2>
      <TimeCircleSwitcher
        years={reorderedYears}
        activeId={activePeriod.id}
        onSelect={setActiveById}
      />
      <TimePeriodNavigate period={activePeriod} />
      <TimeControlButton
        current={currentIndex + 1}
        total={total}
        onPrev={handlePrev}
        onNext={handleNext}
        isPrevDisabled={currentIndex === 0}
        isNextDisabled={currentIndex === total - 1}
      />
      <TimePeriodSwiper
        years={reorderedYears}
        activeId={activePeriod.id}
        onChange={handleChange}
      />
    </section>
  );
};

export default TimelineModule;
