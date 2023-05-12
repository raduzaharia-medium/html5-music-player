import { TopNavigation } from "top-navigation";
import { ArtistBrowser } from "artist-browser";
import { AlbumBrowser } from "album-browser";
import { GenreBrowser } from "genre-browser";
import { SongBrowser } from "song-browser";
import { AudioPlayer } from "audio-player";

document.querySelector("top-navigation").addEventListener("change", () => {
  const topNavigation = document.querySelector("top-navigation");

  if (topNavigation.value === "artists") {
    document.querySelector("main").innerHTML = "<artist-browser></artist-browser>";
    document.querySelector("artist-browser").addEventListener("artistChanged", (e) => {
      const topNavigation = document.querySelector("top-navigation");
      topNavigation.selection = e.detail;
    });
    document.querySelector("artist-browser").addEventListener("songChanged", (e) => {
      const selection = document.querySelector("artist-browser").selectedSong;

      if (selection) {
        const audioPlayer = document.querySelector("audio-player");
        audioPlayer.src = `/api/stream?location=${selection.location}`;
      }
    });
  } else if (topNavigation.value === "albums") {
    document.querySelector("main").innerHTML = "<album-browser></album-browser>";
    document.querySelector("album-browser").addEventListener("albumChanged", (e) => {
      const topNavigation = document.querySelector("top-navigation");
      topNavigation.selection = e.detail;
    });
    document.querySelector("album-browser").addEventListener("songChanged", (e) => {
      const selection = document.querySelector("album-browser").selectedSong;

      if (selection) {
        const audioPlayer = document.querySelector("audio-player");
        audioPlayer.src = `/api/stream?location=${selection.location}`;
      }
    });
  } else if (topNavigation.value === "genres") {
    document.querySelector("main").innerHTML = "<genre-browser></genre-browser>";
    document.querySelector("genre-browser").addEventListener("genreChanged", (e) => {
      const topNavigation = document.querySelector("top-navigation");
      topNavigation.selection = e.detail;
    });
    document.querySelector("genre-browser").addEventListener("songChanged", (e) => {
      const selection = document.querySelector("genre-browser").selectedSong;

      if (selection) {
        const audioPlayer = document.querySelector("audio-player");
        audioPlayer.src = `/api/stream?location=${selection.location}`;
      }
    });
  } else if (topNavigation.value === "songs") {
    document.querySelector("main").innerHTML = "<song-browser></song-browser>";
    document.querySelector("song-browser").addEventListener("songChanged", (e) => {
      const selection = document.querySelector("song-browser").selectedSong;

      if (selection) {
        const audioPlayer = document.querySelector("audio-player");
        audioPlayer.src = `/api/stream?location=${selection.location}`;
      }
    });
  }
});

document.querySelector("audio-player").addEventListener("change", () => {
  const selection = document.querySelector("audio-player").data;
  if (selection) document.getElementById("songList").select(selection.item);
});
document.querySelector("audio-player").addEventListener("next", () => {
  const selection = document.querySelector("main").firstElementChild;
  if (selection.selectedSong) selection.nextSong();
});
document.querySelector("audio-player").addEventListener("previous", () => {
  const selection = document.querySelector("main").firstElementChild;
  if (selection.selectedSong) selection.previousSong();
});
document.querySelector("audio-player").addEventListener("end", () => {
  const selection = document.querySelector("main").firstElementChild;
  if (selection.selectedSong) selection.nextSong();
});

document.querySelector("artist-browser").addEventListener("artistChanged", (e) => {
  const topNavigation = document.querySelector("top-navigation");
  topNavigation.selection = e.detail;
});

document.querySelector("artist-browser").addEventListener("songChanged", (e) => {
  const selection = document.querySelector("artist-browser").selectedSong;

  if (selection) {
    const audioPlayer = document.querySelector("audio-player");
    audioPlayer.src = `/api/stream?location=${selection.location}`;
  }
});
