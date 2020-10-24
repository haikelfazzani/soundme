import { thunk, action } from 'easy-peasy';
import ScService from '../services/ScService';

let genreActions = {
  setGenre: action((state, activeGenre) => {
    state.activeGenre = activeGenre;
  }),
  getTracksByGenre: thunk(async (actions, { activeGenre, limit }) => {
    let tracks = [];
    if (limit) {
      tracks = await ScService.getTracks(activeGenre, limit);
    }
    else {
      tracks = await ScService.getTracks(activeGenre);
    }
    return tracks;
  }),
  getTopTracksByGenre: thunk(async (actions, { activeGenre, limit }) => {
    let tracks = [];
    if (limit) {
      tracks = await ScService.topTracks(activeGenre, limit);
    }
    else {
      tracks = await ScService.topTracks(activeGenre);
    }
    return tracks;
  }),
}

let searchQueryActions = {
  setSearchQuery: action((state, searchQuery) => {
    state.searchQuery = searchQuery;
  }),
  getTracksBySearch: thunk(async (actions, query) => {
    let tracks = await ScService.searchQuery(query);
    return tracks;
  }),
}

let playerActions = {
  setCurrentTrackPlay: action((state, currentTrackPlay) => {
    state.currentTrackPlay = currentTrackPlay;
  }),
  setCurrentTrackPlayIndx: action((state, currentTrackIndex) => {
    state.currentTrackIndex = currentTrackIndex;
  }),
  // add a track to list favorite
  setFavoriteTracks: action((state, favoriteTracks) => {
    state.favoriteTracks = favoriteTracks;
  }),

  addTrackToFavorite: action((state, trackToBeAdded) => {
    let tracks = state.favoriteTracks;
    if (!tracks.some(t => t.id === trackToBeAdded.id)) {

      let favs = [trackToBeAdded, ...state.favoriteTracks];

      localStorage.setItem('sc-favorite-tracks', JSON.stringify(favs));
      state.favoriteTracks = favs;
    }
  }),
  removeTrackFromFavorite: action((state, trackIdToBeRemoved) => {
    let newList = state.favoriteTracks.filter(t => t.id !== trackIdToBeRemoved);
    localStorage.setItem('sc-favorite-tracks', JSON.stringify(newList));
    state.favoriteTracks = newList;
  }),

  setCurrTrackTimeUpdate: action((state, currTrackTimeUpdate) => {
    state.currTrackTimeUpdate = currTrackTimeUpdate;
  }),
  setCurrTrackDuration: action((state, currTrackDuration) => {
    state.currTrackDuration = currTrackDuration;
  }),
}

export { playerActions, searchQueryActions, genreActions };