import { MONTHS } from '../../../utils/months';
import SelectorModal from '../components/SelectorModal';

export class ModalController {
  constructor(selector) {
    this.selector = selector;
  }

  onOpen(dateArray) {
    if (this.modal) this.onClose();

    this.modal = new SelectorModal({ dateArray });
    this.modal.mount(this.selector.$dateSelector);
    this.modal.listen('date:change', (item) => this.changeDate(item));
  }

  changeDate(date) {
    if (typeof date === 'string') {
      this.selector.setMonth(MONTHS.indexOf(date));
    }
    if (typeof date === 'number') this.selector.setYear(date);
  }

  CloseOnClickOutside(event) {
    const isOutside = !event
      .composedPath()
      .includes(this.selector.$dateSelector);

    if (!isOutside) return;

    this.onClose();
  }

  onClose() {
    if (this.modal) {
      this.modal.unmount();
    }
  }
}
