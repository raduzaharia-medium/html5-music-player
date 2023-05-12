import { ListSectionItem } from "/components/list-section/list-section-item.js";

export class GenreListItem extends ListSectionItem {
  get data() {
    return this.dataset.item;
  }

  set data(newValue) {
    this.innerText = newValue.name;
    this.dataset.item = newValue.name;
  }

  connectedCallback() {}
}

customElements.define("genre-list-item", GenreListItem);
