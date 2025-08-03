import React from "react";
import styles from "./YearSlide.module.scss";
import { YearPoint } from "@/entities/TimePeriod/types";

interface Props {
  year: YearPoint;
  isActive: boolean;
}

export const YearSlide: React.FC<Props> = ({ year, isActive }) => (
  <div className={`${styles.slide} ${isActive ? styles.active : ""}`}>
    <div className={styles.slideContent}>
      <div className={styles.year}>{year.firstYear}</div>
      <p className={styles.description}>{year.description}</p>
    </div>
  </div>
);
