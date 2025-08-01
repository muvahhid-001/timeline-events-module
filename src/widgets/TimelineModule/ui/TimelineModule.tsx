import { FC, useState } from "react";
import styles from "./TimelineModule.module.scss";
import { mockYears } from "@/entities/TimePeriod/model/__mocks__/year.mock";
import TimePeriodSwiper from "@/features/timePeriodControl/TimePeriodSwiper/TimePeriodSwiper";
import TimePeriodNavigate from "@/features/timePeriodControl/TimePeriodNavigate/TimePeriodNavigate";
import TimeControlButton from "@/features/timePeriodControl/TimeControlButton/TimeControlButton";
import { TimeCircleSwitcher } from "@/features/timePeriodControl/TimeCircleSwitcher/TimeCircleSwitcher";

const TimelineModule: FC = () => {
  const [activePeriod, setActivePeriod] = useState(mockYears[0]);

  const reorderedYears = [
    activePeriod,
    ...mockYears.filter((y) => y.id !== activePeriod.id),
  ];

  const handleChange = (period: typeof activePeriod) => {
    setActivePeriod(period);
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Исторические даты</h2>
      <TimeCircleSwitcher years={mockYears} onChangePeriod={setActivePeriod} />
      <TimePeriodNavigate period={activePeriod} />
      <TimeControlButton />
      <TimePeriodSwiper
        years={reorderedYears}
        activeId={activePeriod.id}
        onChange={handleChange}
      />
    </section>
  );
};

export default TimelineModule;
