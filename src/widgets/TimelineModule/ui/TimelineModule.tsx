import { FC, useState } from "react";

import styles from "./TimelineModule.module.scss";
import { TimeCircleSwitcher } from "@/entities/TimePeriod/ui/TimeCircleSwitcher/TimeCircleSwitcher";
import { mockYears } from "@/entities/TimePeriod/model/__mocks__/year.mock";
import TimePeriodNavigate from "@/entities/TimePeriod/ui/TimePeriodNavigate/TimePeriodNavigate";
import TimeControlButton from "@/entities/TimePeriod/ui/TimeControlButton/TimeControlButton";

const TimelineModule: FC = () => {
  const [activePeriod, setActivePeriod] = useState(mockYears[0]);

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Исторические даты</h2>
      <TimeCircleSwitcher years={mockYears} onChangePeriod={setActivePeriod} />
      <TimePeriodNavigate period={activePeriod} />
      <TimeControlButton />
    </section>
  );
};

export default TimelineModule;
