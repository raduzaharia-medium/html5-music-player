import { ListSectionItem } from "/components/list-section/list-section-item.js";

export class SongListItem extends ListSectionItem {
  get data() {
    return this.dataset;
  }

  set data(newValue) {
    this.dataset.item = newValue.title;
    this.dataset.artist = newValue.artist;
    this.dataset.location = newValue.location;

    this.querySelector(".title").innerText = newValue.title;
    this.querySelector(".artist").innerText = newValue.artist;
  }

  connectedCallback() {
    this.innerHTML = `<img loading="lazy" decoding="async" src="/images/play.svg" />
      <span class="title"></span>
      <span class="artist"></span>`;
  }
}

customElements.define("song-list-item", SongListItem);
