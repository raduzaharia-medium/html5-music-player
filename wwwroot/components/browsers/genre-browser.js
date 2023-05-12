import { ListSection } from "list-section";
import { GenreListItem } from "list-section/genre-list-item";
import { AlbumListItem } from "list-section/album-list-item";
import { SongListItem } from "list-section/song-list-item";
import { getGenres, getAlbumsByGenre, getSongsForGenre } from "services";

export class GenreBrowser extends HTMLElement {
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
        <list-section id="genres" class="has-input" singular="genre" plural="genres" order="a-z"
            item-type="genre-list-item"></list-section>
        <list-section id="albums" singular="album" plural="albums" order="date added"
            item-type="album-list-item"></list-section>
        <list-section id="songs" class="no-border-right" singular="song" plural="songs" order="album" 
            item-type="song-list-item"></list-section>`;

    await this.loadGenres();

    this.querySelector("#genres").addEventListener("change", async () => {
      await this.loadAlbumsForGenre();
      await this.loadSongsForGenreAndAlbum();

      this.dispatchEvent(new CustomEvent("genreChanged", { detail: this.querySelector("#genres").value, bubbles: true }));
      this.classList.add("genre-selected");
    });

    this.querySelector("#albums").addEventListener("change", async () => {
      await this.loadSongsForGenreAndAlbum();
      this.dispatchEvent(new CustomEvent("albumChanged", { detail: this.querySelector("#albums").value, bubbles: true }));
    });

    this.querySelector("#songs").addEventListener("change", async () => {
      this.selectedSong = this.querySelector("#songs").selectedItem;
      this.dispatchEvent(new CustomEvent("songChanged", { detail: this.querySelector("#songs").value, bubbles: true }));
    });
  }

  async loadGenres() {
    this.querySelector("#genres").classList.add("loading");
    const genres = await getGenres();

    this.querySelector("#genres").setItems(genres);
    this.querySelector("#genres").classList.remove("loading");
  }
  async loadAlbumsForGenre() {
    this.querySelector("#albums").classList.add("loading");
    const albums = await getAlbumsByGenre(this.querySelector("#genres").value);

    this.querySelector("#albums").setItems(albums);
    this.querySelector("#albums").classList.remove("loading");

    this.observer.disconnect();
    this.querySelectorAll("#albums li img").forEach((element) => this.observer.observe(element));
  }
  async loadSongsForGenreAndAlbum() {
    this.querySelector("#songs").classList.add("loading");
    const songs = await getSongsForGenre(this.querySelector("#genres").value, this.querySelector("#albums").value);

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

customElements.define("genre-browser", GenreBrowser);
