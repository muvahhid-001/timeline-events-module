import { FC } from "react";
import styles from "./TimePeriodNavigate.module.scss";
import { useSmoothNumber } from "@/features/timePeriodControl/TimePeriodNavigate/lib/useSmoothNumber";

export const TimePeriodNavigate: FC<{
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
