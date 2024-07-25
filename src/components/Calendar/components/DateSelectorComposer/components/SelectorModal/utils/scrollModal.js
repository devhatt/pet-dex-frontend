import { MONTHS } from '../../../../../utils/months';

export function scrollModal(selector) {
  const { selectorModal } = selector;

  const handleScroll = (event) => {
    event.preventDefault();
    const isScrollNext = event.deltaY > 0;

    const nextYear = selector.items[3].innerText;
    const prevYear = +selector.items[1].innerText;
    const newYear = isScrollNext ? nextYear : prevYear;
    selector.changeYear(newYear);
    const nextMonth = MONTHS.indexOf(selector.items[3].innerText);
    const prevMonth = MONTHS.indexOf(selector.items[1].innerText);
    const newMonth = isScrollNext ? nextMonth : prevMonth;
    selector.changeMonth(newMonth);
  };

  selectorModal.addEventListener('wheel', handleScroll);
}
