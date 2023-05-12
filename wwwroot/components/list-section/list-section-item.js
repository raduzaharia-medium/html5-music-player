export class ListSectionItem extends HTMLElement {
  get data() {
    return this.dataset;
  }
  get dataItem() {
    return this.dataset.item;
  }

  set data(newValue) {
    this.innerText = newValue;
    this.dataset.item = newValue;
  }

  dataItemContains(word) {
    return this.dataItem.toLowerCase().indexOf(word.toLowerCase()) !== -1;
  }
}

customElements.define("list-section-item", ListSectionItem);
