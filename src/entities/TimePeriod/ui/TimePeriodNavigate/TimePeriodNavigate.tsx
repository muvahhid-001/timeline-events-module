import { FC } from "react";
import styles from "./TimePeriodNavigate.module.scss";

const TimePeriodNavigate: FC = () => {
  return (
    <div className={styles.header}>
      <p className={styles.headerFirstYear}>2020</p>
      <p className={styles.headerLastYear}>2025</p>
    </div>
  );
};

export default TimePeriodNavigate;
