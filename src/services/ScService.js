import axios from 'axios';

const BASE_URL = 'https://api.soundcloud.com/tracks?linked_partitioning=1';

export default class ScService {

  static async getKey () {
    const api = await axios.get('https://bitbucket.org/!api/2.0/snippets/haikel2090/rn8a68/7f86164ec21e567b483c6fc33a2732147f585689/files/no.json');
    return api.data.api;
  }

  static async initSc () {
    const api_data = await this.getKey();
    window.SC.initialize({ client_id: api_data });
  }

  static async getTracks (genre, limit = 48) {
    let key = await this.getKey();
    let url = `${BASE_URL}&limit=${limit}&offset=0&client_id=${key}&tags=${genre}`;
    const tracks = await axios.get(url);
    return tracks.data.collection;
  }

  static async getTracksBetween (genre, limit = 48, from, to) {
    let key = await this.getKey();
    let url = `${BASE_URL}&limit=${limit}&offset=0&client_id=${key}&created_at[from]=${from}%${to}&tags=${genre}`;
    const tracks = await axios.get(url);
    return tracks.data.collection;
  }

  static async searchQuery (query, limit = 48) {
    await this.initSc();
    query = encodeURIComponent(query);
    const tracks = await window.SC.get('/tracks', { q: query, limit });
    return tracks;
  }
}