import { FC } from "react";
import styles from "./TimeControlButton.module.scss";

interface Props {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  isPrevDisabled?: boolean;
  isNextDisabled?: boolean;
}

const TimeControlButton: FC<Props> = ({
  current,
  total,
  onPrev,
  onNext,
  isPrevDisabled = false,
  isNextDisabled = false,
}) => (
  <nav className={styles.navigateTime}>
    <p className={styles.navigateTimeParagraph}>
      {String(current).padStart(2, "0")}/{String(total).padStart(2, "0")}
    </p>
    <div className={styles.navigateTimeButtonBlock}>
      <button
        className={styles.navigateTimeButton}
        onClick={onPrev}
        disabled={isPrevDisabled}
      >
        {"<"}
      </button>
      <button
        className={styles.navigateTimeButton}
        onClick={onNext}
        disabled={isNextDisabled}
      >
        {">"}
      </button>
    </div>
  </nav>
);
export default TimeControlButton;
