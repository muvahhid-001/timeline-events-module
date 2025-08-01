import { FC } from "react";
import styles from "./TimePeriodNavigate.module.scss";
import { useSmoothNumber } from "@/entities/TimePeriod/lib/useSmoothNumber";

const TimePeriodNavigate: FC<{
  period: { firstYear: number; lastYear: number };
}> = ({ period }) => {
  const first = useSmoothNumber(period.firstYear);
  const last = useSmoothNumber(period.lastYear);

  return (
    <div className={styles.header}>
      <p className={styles.headerFirstYear}>{first}</p>
      <p className={styles.headerLastYear}>{last}</p>
    </div>
  );
};

export default TimePeriodNavigate;
