import styles from "./TimeControlButton.module.scss";

const TimeControlButton = ({ onClick }: { onClick: () => void }) => (
  <nav className={styles.navigateTime}>
    <p>06/06</p>
    <button>{"<"}</button>
    <button>{">"}</button>
  </nav>
);
