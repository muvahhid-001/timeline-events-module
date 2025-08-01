import { FC } from "react";

import styles from "./TimelineModule.module.scss";
import { TimeCircleSwitcher } from "@/entities/TimePeriod/ui/TimeCircleSwitcher/TimeCircleSwitcher";
import { mockYears } from "@/entities/TimePeriod/model/__mocks__/year.mock";
import TimePeriodNavigate from "@/entities/TimePeriod/ui/TimePeriodNavigate/TimePeriodNavigate";

const TimelineModule: FC = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Исторические даты</h2>
      <TimeCircleSwitcher years={mockYears} />
      <TimePeriodNavigate />
    </section>
  );
};

export default TimelineModule;
