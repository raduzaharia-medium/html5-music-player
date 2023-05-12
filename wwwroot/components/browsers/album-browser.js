import { ListSection } from "list-section";
import { AlbumListItem } from "list-section/album-list-item";
import { SongListItem } from "list-section/song-list-item";
import { getAlbums, getSongsForArtist } from "services";

export class AlbumBrowser extends HTMLElement {
  async connectedCallback() {
    this.innerHTML = `
        <list-section id="albums" class="has-input" singular="album" plural="albums" order="date added"
            item-type="album-list-item"></list-section>
        <list-section id="songs" class="no-border-right" singular="song" plural="songs" order="album" 
            item-type="song-list-item"></list-section>`;

    await this.loadAlbums();

    this.querySelector("#albums").addEventListener("change", async () => {
      await this.loadSongsForAlbum();

      this.dispatchEvent(new CustomEvent("albumChanged", { detail: this.querySelector("#albums").value, bubbles: true }));
      this.classList.add("album-selected");
    });

    this.querySelector("#songs").addEventListener("change", async () => {
      this.selectedSong = this.querySelector("#songs").selectedItem;
      this.dispatchEvent(new CustomEvent("songChanged", { detail: this.querySelector("#songs").value, bubbles: true }));
    });
  }

  async loadAlbums() {
    this.querySelector("#albums").classList.add("loading");
    const albums = await getAlbums();

    this.querySelector("#albums").setItems(albums);
    this.querySelector("#albums").classList.remove("loading");
  }
  async loadSongsForAlbum() {
    this.querySelector("#songs").classList.add("loading");
    const songs = await getSongsForArtist(this.querySelector("#albums").selectedItem.artist, this.querySelector("#albums").value);

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

customElements.define("album-browser", AlbumBrowser);
