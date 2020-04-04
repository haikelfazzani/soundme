import axios from 'axios';
import timeFormat from '../util/timeFormat';
import formatNum from '../util/formatNum';

const BASE_URL = 'https://api.soundcloud.com';
const API_KEY = '?client_id=08f79801a998c381762ec5b15e4914d5';

export default class ScUserService {

  static async getInfosAndTracks (userId) {
    const infos = await axios.get(BASE_URL + '/users/' + userId + API_KEY);
    const tracks = await this.getTracks(userId);
    const profiles = await axios.get(BASE_URL + '/users/' + userId + '/web-profiles' + API_KEY);
    return {
      infos: infos.data,
      tracks: tracks.data,
      profiles: profiles.data
    };
  }

  static async getTrackAndComments (userId, trackId) {
    let tracks = await this.getTracks(userId);
    let comments = await axios.get(BASE_URL + '/tracks/' + trackId + '/comments' + API_KEY);

    let track = tracks.data.find(t => t.id === parseInt(trackId, 10));

    let infos = [
      'Plays: ' + formatNum(track.playback_count),
      'Favoritings: ' + formatNum(track.favoritings_count),
      'Reposts: ' + formatNum(track.reposts_count),
      'Comments: ' + formatNum(track.comment_count),
      'Duration: ' + timeFormat(track.duration / 1024),
      'Downloads: ' + track.download_count
    ];

    return {
      track,
      infos,
      comments: comments.data
    };
  }

  static async getTracks (userId) {
    const tracks = await axios.get(BASE_URL + '/users/' + userId + '/tracks' + API_KEY);
    return tracks;
  }
}