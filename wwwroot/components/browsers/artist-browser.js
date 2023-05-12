import { ListSection } from "list-section";
import { ArtistListItem } from "list-section/artist-list-item";
import { AlbumListItem } from "list-section/album-list-item";
import { SongListItem } from "list-section/song-list-item";
import { getArtists, getAlbumsByArtist, getSongsForArtist } from "services";

export class ArtistBrowser extends HTMLElement {
  interactionEntries = [];
  timeout = null;
  observer = new IntersectionObserver(
    (entries, observer) => {
      this.interactionEntries.push(...entries);
      clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        this.interactionEntries
          .filter((element) => element.isIntersecting)
          .slice(-20)
          .forEach((element) => {
            console.log(`Processing ${element.target.parentElement.dataset.src}`);

            element.target.src = element.target.parentElement.dataset.src;
            observer.unobserve(element.target);
          });

        this.interactionEntries = [];
      }, 500);
    },
    {
      root: document.getElementById("albums"),
      threshold: 1.0,
    }
  );

  async connectedCallback() {
    this.innerHTML = `
        <list-section id="artists" class="has-input" singular="artist" plural="artists" order="a-z"
            item-type="artist-list-item"></list-section>
        <list-section id="albums" singular="album" plural="albums" order="date added"
            item-type="album-list-item"></list-section>
        <list-section id="songs" class="no-border-right" singular="song" plural="songs" order="album" 
            item-type="song-list-item"></list-section>`;

    await this.loadArtists();

    this.querySelector("#artists").addEventListener("change", async () => {
      await this.loadAlbumsForArtist();
      await this.loadSongsForArtistAndAlbum();

      this.dispatchEvent(new CustomEvent("artistChanged", { detail: this.querySelector("#artists").value, bubbles: true }));
      this.classList.add("artist-selected");
    });

    this.querySelector("#albums").addEventListener("change", async () => {
      await this.loadSongsForArtistAndAlbum();
      this.dispatchEvent(new CustomEvent("albumChanged", { detail: this.querySelector("#albums").value, bubbles: true }));
    });

    this.querySelector("#songs").addEventListener("change", async () => {
      this.selectedSong = this.querySelector("#songs").selectedItem;
      this.dispatchEvent(new CustomEvent("songChanged", { detail: this.querySelector("#songs").value, bubbles: true }));
    });
  }

  async loadArtists() {
    this.querySelector("#artists").classList.add("loading");
    const artists = await getArtists();

    this.querySelector("#artists").setItems(artists);
    this.querySelector("#artists").classList.remove("loading");
  }
  async loadAlbumsForArtist() {
    this.querySelector("#albums").classList.add("loading");
    const albums = await getAlbumsByArtist(this.querySelector("#artists").value);

    this.querySelector("#albums").setItems(albums);
    this.querySelector("#albums").classList.remove("loading");

    this.observer.disconnect();
    this.querySelectorAll("#albums li img").forEach((element) => this.observer.observe(element));
  }
  async loadSongsForArtistAndAlbum() {
    this.querySelector("#songs").classList.add("loading");
    const songs = await getSongsForArtist(this.querySelector("#artists").value, this.querySelector("#albums").value);

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

customElements.define("artist-browser", ArtistBrowser);
