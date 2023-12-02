((PET) => {
  const QUERY_COUNTER_INIT = '[data-counter-init]';

  function getCountersOnPage() {
    return document.querySelectorAll(QUERY_COUNTER_INIT);
  }

  function initCounter(counterElement) {
    let counter = 0;

    const setCounter = (count) => {
      counter = count;
      counterElement.innerHTML = `count is ${counter}`;
    };

    counterElement.addEventListener('click', () => setCounter(counter + 1));

    setCounter(counter);
  }

  PET.Counter = {
    getCountersOnPage,
    initCounter,
  };
})((window.PET = window.PET || {}));
