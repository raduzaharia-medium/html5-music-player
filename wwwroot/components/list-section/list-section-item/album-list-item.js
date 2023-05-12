import { ListSectionItem } from "list-section/list-section-item";

export class AlbumListItem extends ListSectionItem {
  get data() {
    return this.dataset;
  }

  set data(newValue) {
    this.dataset.item = newValue.name;
    this.dataset.artist = newValue.artist;
    this.dataset.src = `/api/album-art?artist=${newValue.artist}&album=${newValue.name}`;

    this.querySelector("strong").innerText = newValue.name;
    this.querySelector("span").innerText = newValue.artist;
  }

  connectedCallback() {
    this.innerHTML = `<img loading="lazy" decoding="async" src="/images/musical-note.svg" />
      <legend>
        <strong></strong>
        <span></span>
      </legend>`;
  }
}

customElements.define("album-list-item", AlbumListItem);
