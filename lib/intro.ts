/**
 * The preloader hands over to the hero at one moment. Anything that waits
 * for that hand-over subscribes here; late subscribers run immediately.
 */
let done = false;
const listeners = new Set<() => void>();

export function onIntroDone(callback: () => void) {
  if (done) {
    callback();
    return () => {};
  }
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

export function finishIntro() {
  if (done) return;
  done = true;
  listeners.forEach((callback) => callback());
  listeners.clear();
}

/** Runs before first paint, from the root layout. */
export const introScript = `(function(){var d=document.documentElement;try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('motion-ok');if(sessionStorage.getItem('ss-intro'))d.classList.add('intro-skip')}catch(e){}})();`;
