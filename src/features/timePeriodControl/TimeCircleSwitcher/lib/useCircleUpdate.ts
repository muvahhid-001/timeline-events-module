import { useEffect } from "react";
import gsap from "gsap";

type RotationRef = { current: { value: number } | null };
type SpanRefs = React.RefObject<HTMLSpanElement[]>;

export function useCircleUpdate(
  circleRef: React.RefObject<HTMLDivElement | null>,
  spansRef: SpanRefs,
  rotation: RotationRef
) {
  useEffect(() => {
    const update = () => {
      const current = rotation.current?.value;
      if (typeof current !== "number") return;

      if (circleRef.current) {
        gsap.set(circleRef.current, { rotate: current });
      }

      spansRef.current?.forEach((span) => {
        if (span) {
          gsap.set(span, { rotate: -current });
        }
      });
    };

    gsap.ticker.add(update);
    return () => {
      gsap.ticker.remove(update);
    };
  }, []);
}
