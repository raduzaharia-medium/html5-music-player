import { ListSectionItem } from "list-section/list-section-item";

export class ArtistListItem extends ListSectionItem {
  get data() {
    return this.dataset.item;
  }

  set data(newValue) {
    this.innerText = newValue.name;
    this.dataset.item = newValue.name;
  }

  connectedCallback() {
    this.innerHtml = `${this.dataset.item}`;
  }
}

customElements.define("artist-list-item", ArtistListItem);
