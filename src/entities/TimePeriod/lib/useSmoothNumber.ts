import { useEffect, useState } from "react";

export const useSmoothNumber = (target: number, duration = 950) => {
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (value === target) return;

    const delta = target - value;
    const direction = Math.sign(delta);
    const frameCount = Math.abs(delta);
    const frameDuration = duration / frameCount;

    let current = value;
    let frame = 0;

    const animate = () => {
      if (frame < frameCount) {
        current += direction;
        setValue(current);
        frame++;
        setTimeout(animate, frameDuration);
      }
    };

    animate();
  }, [target]);

  return value;
};
