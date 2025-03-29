import { gsap } from "gsap";

export const animateHero = (heroAni) => {
  gsap.from(heroAni.current, {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out",
  });

  gsap.from(heroAni.current.querySelector("h1"), {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.5,
    ease: "power2.out",
  });

  gsap.from(heroAni.current.querySelector("p"), {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.8,
    ease: "power2.out",
  });

  gsap.from(heroAni.current.querySelector("a"), {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 1.1,
    ease: "power2.out",
  });
};