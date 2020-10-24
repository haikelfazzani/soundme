import axios from 'axios';
import timeFormat from '../util/timeFormat';
import formatNum from '../util/formatNum';

const BASE_URL = 'https://api.soundcloud.com';
const API_KEY = '?client_id='+process.env.REACT_APP_SOUNDCLOUD_API_KEY;

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
      { icon: 'fa fa-play', data: formatNum(track.playback_count) },
      { icon: 'fa fa-heart', data: formatNum(track.favoritings_count) },
      { icon: 'fa fa-share', data: formatNum(track.reposts_count) },
      { icon: 'fa fa-comment', data: formatNum(track.comment_count) },
      { icon: 'fa fa-clock', data: timeFormat(track.duration / 1024) },
      { icon: 'fa fa-download', data: track.download_count }
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