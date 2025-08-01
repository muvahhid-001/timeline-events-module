import gsap from "gsap";

export const switchFadeAnimation = (el: HTMLElement): Promise<void> => {
  return new Promise((resolve) => {
    gsap
      .timeline({ onComplete: resolve })
      .to(el, { opacity: 0, y: 10, duration: 0.3, ease: "power3.in" })
      .to(el, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, "+=0.3");
  });
};
