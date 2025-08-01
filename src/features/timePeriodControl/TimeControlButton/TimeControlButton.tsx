import { FC } from "react";
import styles from "./TimeControlButton.module.scss";

const TimeControlButton: FC = () => (
  <nav className={styles.navigateTime}>
    <p className={styles.navigateTimeParagraph}>06/06</p>
    <div className={styles.navigateTimeButtonBlock}>
      <button className={styles.navigateTimeButton}>{"<"}</button>
      <button className={styles.navigateTimeButton}>{">"}</button>
    </div>
  </nav>
);

export default TimeControlButton;
