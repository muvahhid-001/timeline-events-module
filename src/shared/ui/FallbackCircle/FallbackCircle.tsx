import React from "react";
import styles from "./FallbackCircle.module.scss";

export const FallbackCircle: React.FC = () => {
  return (
    <div className={styles.fallbackCircleWrapper}>
      <div className={styles.fallbackCircle} />
    </div>
  );
};
