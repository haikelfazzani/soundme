import axios from 'axios';

const BASE_URL = 'https://api.soundcloud.com/users/';
const API_KEY = '?client_id=08f79801a998c381762ec5b15e4914d5';

export default class ScUserService {

  static async getInfosAndTracks (userId) {
    const details = await axios.get(BASE_URL + userId + API_KEY);
    const tracks = await axios.get(BASE_URL + userId + '/tracks' + API_KEY);
    const profiles = await axios.get(BASE_URL + userId + '/web-profiles' + API_KEY);
    return {
      details: details.data,
      tracks: tracks.data,
      profiles: profiles.data
    };
  }
}