import { ListSection } from "list-section";
import { SongListItem } from "list-section/song-list-item";
import { getSongs } from "services";

export class SongBrowser extends HTMLElement {
  async connectedCallback() {
    this.innerHTML = `
        <list-section id="songs" class="has-input no-border-right" singular="song" plural="songs" order="album" 
            item-type="song-list-item"></list-section>`;

    await this.loadSongs();

    this.querySelector("#songs").addEventListener("change", async () => {
      this.selectedSong = this.querySelector("#songs").selectedItem;
      this.dispatchEvent(new CustomEvent("songChanged", { detail: this.querySelector("#songs").value, bubbles: true }));
    });
  }

  async loadSongs() {
    this.querySelector("#songs").classList.add("loading");
    const songs = await getSongs();

    this.querySelector("#songs").setItems(songs);
    this.querySelector("#songs").classList.remove("loading");
  }

  nextSong() {
    this.querySelector("#songs").selectNext();
  }
  previousSong() {
    this.querySelector("#songs").selectPrevious();
  }
}

customElements.define("song-browser", SongBrowser);
