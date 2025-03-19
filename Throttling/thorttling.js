const btn = document.querySelector(".btn");
const triggered = document.querySelector(".triggered-count");
const pressed = document.querySelector(".pressed-count");
console.log("running");

let triggeredCount = 0;
let pressedCount = 0;

//with lodash
const throttle = _.throttle(() => {
  triggeredCount += 1;
  triggered.innerHTML = triggeredCount;
}, 700);

btn.addEventListener("click", () => {
  pressedCount += 1;

  pressed.innerHTML = pressedCount;

  throttle();
});

//polyfill
const btn_2 = document.querySelector(".btn-2");
const triggered_2 = document.querySelector(".triggered-count-2");
const pressed_2 = document.querySelector(".pressed-count-2");

let triggeredCount_2 = 0;
let pressedCount_2 = 0;
const throttlePolyfill = (cb, delay) => {
  let last = 0; // 0 ms initally

  return function (...args) {
    const now = new Date().getTime();
    console.log("throttle", now, now - last < delay, delay);

    if (now - last < delay) return;
    console.log("here", { now, last, diff: now - last });
    last = now;

    return cb(...args);
  };
};

const mythrottle = throttlePolyfill(() => {
  triggeredCount_2 += 1;
  triggered_2.innerHTML = triggeredCount_2;
}, 800);

btn_2.addEventListener("click", () => {
  pressedCount_2 += 1;

  pressed_2.innerHTML = pressedCount_2;

  mythrottle();
});
