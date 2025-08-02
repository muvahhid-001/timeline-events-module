import { useEffect, useRef, useState } from "react";
import styles from "./TimeCircleSwitcher.module.scss";
import { YearPoint } from "@/entities/TimePeriod/types";
import { useCircleUpdate } from "@/entities/TimePeriod/model/hooks/useCircleUpdate";
import { useCircleClick } from "@/entities/TimePeriod/model/hooks/useCircleClick";

const CIRCLE_SIZE_PX = 33.5 * 16;
const RADIUS = CIRCLE_SIZE_PX / 2;
const ANGLE_OFFSET = 45;

interface TimeCircleSwitcherProps {
  years: YearPoint[];
  activeId: number;
  onSelect?: (id: number) => void;
}

export const TimeCircleSwitcher = ({
  years,
  activeId,
  onSelect,
}: TimeCircleSwitcherProps) => {
  const circleRef = useRef<HTMLDivElement>(null);
  const spansRef = useRef<HTMLSpanElement[]>([]);
  const rotation = useRef<{ value: number }>({ value: 0 });
  const targetRotation = useRef(0);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [activeIndex, setActiveIndex] = useState(
    years.findIndex((y) => y.id === activeId)
  );
  const angleStep = 360 / years.length;

  useCircleUpdate(circleRef, spansRef, rotation);
  const handleClick = useCircleClick(
    angleStep,
    setActiveIndex,
    rotation,
    targetRotation,
    tweenRef
  );

  spansRef.current = [];

  useEffect(() => {
    const index = years.findIndex((y) => y.id === activeId);
    if (index !== -1 && index !== activeIndex) {
      handleClick(index);
      setActiveIndex(index);
    }
  }, [activeId]);

  return (
    <nav className={styles.wrapper}>
      <div className={styles.wrapperCircle} ref={circleRef}>
        {years.map((item, index) => {
          const angle = angleStep * index - ANGLE_OFFSET;
          const x = RADIUS + RADIUS * Math.cos((angle * Math.PI) / 180);
          const y = RADIUS + RADIUS * Math.sin((angle * Math.PI) / 180);

          return (
            <div
              key={item.id}
              className={`${styles.wrapperPoint} ${
                index === activeIndex ? styles.active : ""
              }`}
              style={{ left: `${x}px`, top: `${y}px` }}
              onClick={() => {
                handleClick(index);
                setActiveIndex(index);
                onSelect?.(item.id);
              }}
            >
              <div className={styles.wrapperHitbox}>
                <div className={styles.wrapperPointInner}>
                  <span
                    ref={(el) => {
                      if (el) spansRef.current[index] = el;
                    }}
                  >
                    {index + 1}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
};
