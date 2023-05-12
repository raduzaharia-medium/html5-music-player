export async function getArtists() {
  const artistsRequest = await fetch("/api/artists");
  const artists = await artistsRequest.json();

  return artists;
}

export async function getGenres() {
  const genresRequest = await fetch("/api/genres?artist=all");
  const genres = await genresRequest.json();

  return genres;
}

export async function getAlbums() {
  const albumsRequest = await fetch("/api/albums?artist=all&genre=all");
  const albums = await albumsRequest.json();

  return albums;
}

export async function getSongs() {
  const songsRequest = await fetch("/api/songs?artist=all&album=all&genre=all");
  const songs = await songsRequest.json();

  return songs;
}

export async function getAlbumsByArtist(artistName) {
  const albumsRequest = await fetch(`/api/albums?artist=${artistName}&genre=all`);
  const albums = await albumsRequest.json();

  return albums;
}

export async function getAlbumsByGenre(genreName) {
  const albumsRequest = await fetch(`/api/albums?genre=${genreName}&artist=all`);
  const albums = await albumsRequest.json();

  return albums;
}

export async function getSongsForArtist(artistName, albumName) {
  const songsRequest = await fetch(`/api/songs?artist=${artistName}&album=${albumName || "all"}&genre=all`);
  const songs = await songsRequest.json();

  return songs;
}

export async function getSongsForGenre(genreName, albumName) {
  const songsRequest = await fetch(`/api/songs?genre=${genreName}&album=${albumName || "all"}&artist=all`);
  const songs = await songsRequest.json();

  return songs;
}
