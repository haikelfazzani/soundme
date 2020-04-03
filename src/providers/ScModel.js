import { genreActions, searchQueryActions, playerActions } from "./Actions";

let localFavs = localStorage.getItem('sc-favorite-tracks');
let favoriteTracks = localFavs && localFavs.length > 0 ? JSON.parse(localFavs) : [];

export default {
  currentTrackPlay: {},
  favoriteTracks,
  currentTrackIndex: 0,
  activeGenre: 'Rock',
  searchQuery: '',
  ...genreActions,
  ...searchQueryActions,
  ...playerActions
};