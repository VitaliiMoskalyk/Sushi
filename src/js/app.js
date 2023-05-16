import * as flsFunctions from "./modules/functions.js";
import { gsap, ScrollTrigger } from "gsap/all.js";
import themeSwitch from "./modules/themeSwitch.js";

gsap.registerPlugin(ScrollTrigger);

const selectAll = (e) => document.querySelectorAll(e);

const tracks = selectAll(".horisontal-scrolling");

tracks.forEach((track, i) => {
  let trackWrapper = track.querySelectorAll(".horisontal-scrolling__track");

  let trackWrapperWidth = () => {
    let width = 0;
    trackWrapper.forEach((el) => (width += el.offsetWidth));
    return width;
  };

  gsap.to(trackWrapper, {
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
});

flsFunctions.isWebP();

const inputName = document.querySelector(".form-name_input");
const namePlaceholder = document.querySelector(".form-name-title");

inputName.addEventListener("mouseenter", (e) => handleInput(e));
inputName.addEventListener("mouseleave", (e) => handleInputLeave(e));
function handleInput(input) {
  namePlaceholder.style.bottom = "20px";
  console.dir(input);
}

function handleInputLeave(input) {
  if (input.target.value === "") namePlaceholder.style.bottom = "0";
}

//theme switcher
themeSwitch();
