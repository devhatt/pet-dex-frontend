import SelectorModal from '../components/SelectorModal';

export class ModalController {
  constructor(selector) {
    this.selector = selector;
  }

  Open(dateArray) {
    if (this.modal) this.Close();

    this.modal = new SelectorModal(dateArray);
    this.modal.mount(this.selector.$dateSelector);
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
