const btn = document.querySelector(".btn");
const triggered = document.querySelector(".triggered-count");
const pressed = document.querySelector(".pressed-count");
console.log("running");

let triggeredCount = 0;
let pressedCount = 0;


//with lodash
const debounce = _.debounce(() => {
  triggeredCount += 1;
  triggered.innerHTML = triggeredCount;
}, 700);

btn.addEventListener("click", () => {
  pressedCount += 1;

  pressed.innerHTML = pressedCount;

  debounce();
});



//polyfill
const btn_2 = document.querySelector(".btn-2");
const triggered_2 = document.querySelector(".triggered-count-2");
const pressed_2 = document.querySelector(".pressed-count-2");

let triggeredCount_2 = 0;
let pressedCount_2 = 0;
const debouncePolyfill = (cb,delay)=>{

    let timer

    //rest operator
    return function(...args){

        // if there is still timer and event has fired again means the dealy time has not passes then clear the exisitn timer and create a new one
        if(timer) {
            console.log("timer",timer)
            clearTimeout(timer)
            
        }else{
            console.log("No timer")
        }
        timer=setTimeout(()=>{
            cb(...args)
        },delay)

    }

}

const myDebounce=debouncePolyfill(()=>{
    triggeredCount_2 += 1;
    triggered_2.innerHTML = triggeredCount_2;
},800)
  
  btn_2.addEventListener("click", () => {
    pressedCount_2 += 1;
  
    pressed_2.innerHTML = pressedCount_2;
  
    myDebounce();
  });


  /**
 * Understanding Debounce Behavior in Two Cases
 *
 * This document explains the difference between using `debouncePolyfill`
 * directly inside an event listener vs. using a pre-initialized debounce function (`myDebounce`).
 *
 * -----------------------
 * Case 1: Calling `debouncePolyfill` inside the event listener
 * -----------------------
 * btn_2.addEventListener("click", () => {
 *     pressedCount_2 += 1;
 *     pressed_2.innerHTML = pressedCount_2;
 * 
 *     debouncePolyfill(() => {
 *         triggeredCount_2 += 1;
 *         triggered_2.innerHTML = triggeredCount_2;
 *     }, 800)();
 * });
 * 
 * - Every time the button is clicked, a **new debounce function instance is created**.
 * - Each instance has its own `timer` variable, meaning previous timers are not retained.
 * - As a result, **debouncing does not work**—each click schedules an independent timeout.
 * - Multiple clicks within 800ms will all execute separately after 800ms.
 *
 * -----------------------
 * Case 2: Using a pre-initialized debounce function (`myDebounce`)
 * -----------------------
 * const myDebounce = debouncePolyfill(() => {
 *     triggeredCount_2 += 1;
 *     triggered_2.innerHTML = triggeredCount_2;
 * }, 800);
 * 
 * btn_2.addEventListener("click", () => {
 *     pressedCount_2 += 1;
 *     pressed_2.innerHTML = pressedCount_2;
 * 
 *     myDebounce(); // Using the same debounce instance
 * });
 * 
 * - `myDebounce` is **initialized once**, meaning it retains the same `timer` variable.
 * - Each call resets the previous timer if it hasn’t completed yet.
 * - This ensures that **only the last call in a short time window executes**.
 * - Proper **debouncing is achieved**: If multiple clicks happen within 800ms, only the last one executes.
 *
 * -----------------------
 * Conclusion:
 * - **Use `myDebounce` (pre-initialized) for proper debouncing**.
 * - Avoid calling `debouncePolyfill` inside the event listener, as it creates a new instance every time.
 */

  