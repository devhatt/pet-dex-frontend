((PET) => {
  function onDOMContentLoaded() {
    const countersToInit = PET.Counter.getCountersOnPage();
    countersToInit.forEach(PET.Counter.initCounter);
  }

  document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
})((window.PET = window.PET || {}));
