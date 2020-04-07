import { thunk, action } from 'easy-peasy';
import ScService from '../services/ScService';

let genreActions = {
  setGenre: action((state, activeGenre) => {
    return { ...state, activeGenre };
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
}

let searchQueryActions = {
  setSearchQuery: action((state, searchQuery) => {
    return { ...state, searchQuery };
  }),
  getTracksBySearch: thunk(async (actions, query) => {
    let tracks = await ScService.searchQuery(query);
    return tracks;
  }),
}

let playerActions = {
  setCurrentTrackPlay: action((state, currentTrackPlay) => {
    return { ...state, currentTrackPlay };
  }),
  setCurrentTrackPlayIndx: action((state, currentTrackIndex) => {
    return { ...state, currentTrackIndex };
  }),
  // add a track to list favorite
  addTrackToFavorite: action((state, trackToBeAdded) => {
    let tracks = state.favoriteTracks;
    if (!tracks.some(t => t.id === trackToBeAdded.id)) {

      let favs = [trackToBeAdded, ...state.favoriteTracks];

      localStorage.setItem('sc-favorite-tracks', JSON.stringify(favs));
      return { ...state, favoriteTracks: favs };
    }
  }),
  removeTrackFromFavorite: action((state, trackIdToBeRemoved) => {
    let newList = state.favoriteTracks.filter(t => t.id !== trackIdToBeRemoved);

    localStorage.setItem('sc-favorite-tracks', JSON.stringify(newList));

    return { ...state, favoriteTracks: newList };
  })
}

export { playerActions, searchQueryActions, genreActions };