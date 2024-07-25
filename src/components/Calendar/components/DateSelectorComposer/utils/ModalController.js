import SelectorModal from '../components/SelectorModal';

export class ModalController {
  constructor(selector) {
    this.selector = selector;
  }

  Open(monthArray, yearArray) {
    if (this.modal) this.Close();

    this.modal = new SelectorModal(monthArray, yearArray);
    this.modal.mount(this.selector.$dateSelector);
    this.modal.listen('month:change', (month) => this.selector.setMonth(month));
    this.modal.listen('year:change', (year) => this.selector.setYear(year));
  }

  CloseOnClickOutside(event) {
    const isOutside = !event
      .composedPath()
      .includes(this.selector.$dateSelector);

    if (!isOutside) return;

    this.Close();
  }

  Close() {
    if (this.modal) {
      this.modal.unmount();
    }
  }
}
