import gsap from "gsap";

type RotationRef = { current: { value: number } | null };
type TweenRef = { current: gsap.core.Tween | null };
type TargetRef = { current: number };

export function useCircleClick(
  angleStep: number,
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>,
  rotation: RotationRef,
  targetRotation: TargetRef,
  tweenRef: TweenRef
) {
  return (index: number) => {
    const newRotation = -angleStep * index;
    setActiveIndex(index);
    targetRotation.current = newRotation;

    if (rotation.current) {
      tweenRef.current?.kill();
      tweenRef.current = gsap.to(rotation.current, {
        value: newRotation,
        duration: 0.95,
        ease: "power2.inOut",
      });
    }
  };
}
