import * as flsFunctions from "./modules/functions.js";
import { gsap, ScrollTrigger } from "gsap/all.js";

gsap.registerPlugin(ScrollTrigger);

const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);

const tracks = selectAll(".sticky-element");

tracks.forEach((track, i) => {
  let trackWrapper = track.querySelectorAll(".track");
  let allImgs = track.querySelectorAll(".image");

  let trackWrapperWidth = () => {
    let width = 0;
    trackWrapper.forEach((el) => (width += el.offsetWidth));
    return width;
  };

  let scrollTween = gsap.to(trackWrapper, {
    x: () => -trackWrapperWidth() + window.innerWidth,
    scrollTrigger: {
      trigger: track,
      //invalidateOnRefresh: true,
      pin: true,
      scrub: 1,
      start: "center center",
      duration: { min: 0.5, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
      delay: 0.5, // wait 0.2 seconds from the last scroll event before doing the snapping
      ease: "power1.inOut",
      end: () => "+=" + (track.scrollWidth + window.innerWidth),
      invalidateOnRefresh: true,
      id: "id-one",
    },
  });

  allImgs.forEach((img, i) => {
    //need to know where is the x position of the first image of the parrallax before the scroller pins and scroll animation begins

    //since the first .panel-wide element is 50% from the left of the view port, this means the parallax image moved -10vw (x: "-10vw") to the left in the normal animation of the horizontal scroll

    //when the left of the .panel-wide reaches the left site of the viewport  the image inside moved 20vw = x: 0

    //if i don't set, let's call it, a initial value the parallax jumps to the right position when the scroll pins

    //images parallax inside the .panel-wide elements
    gsap.to(img, {
      //-10vw, the correct position in the normal animation i guess. using mental math ;). can this be done before the pin
      x: "-10vw", //change this to -10vw to see parallax image not jump
    });
    // the intended parallax animation
    gsap.fromTo(
      img,
      {
        x: "-30vw",
      },
      {
        x: "20vw",
        scrollTrigger: {
          trigger: img.parentNode, //.panel-wide
          containerAnimation: scrollTween,
          start: "left right",
          end: "right left",
          scrub: true,
          invalidateOnRefresh: true,
          id: "id-two",
        },
      }
    );
  });
});

flsFunctions.isWebP();
