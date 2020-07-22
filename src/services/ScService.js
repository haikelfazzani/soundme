import axios from 'axios';

const PROXY_SERVER = 'https://yacdn.org/proxy/';
const BASE_URL = 'https://api.soundcloud.com/tracks?linked_partitioning=1';

export default class ScService {

  static async getKey () {
    const api = await axios.get('https://api.npoint.io/a6b9d3882951b3d37df5');
    return api.data.api_key;
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

  // top tracks by genre (beta)
  static async topTracks () {
    try {
      let resp = await axios.get(PROXY_SERVER + 'https://api-v2.soundcloud.com/charts?kind=top&genre=soundcloud:genres:pop&client_id=08f79801a998c381762ec5b15e4914d5')
      return resp.data.collection;
    } catch (error) {
      return null;
    }
  }

  static async getTracksBetween (genre, limit = 48, from, to) {
    let key = await this.getKey();
    let url = `${BASE_URL}&limit=${limit}&offset=0&client_id=${key}&created_at[from]=${from}%${to}&tags=${genre}`;
    const tracks = await axios.get(url);
    return tracks.data.collection;
  }

  static async searchQuery (query, limit = 96) {
    await this.initSc();
    query = encodeURIComponent(query);
    const tracks = await window.SC.get('/tracks', { q: query, limit });
    return tracks;
  }
}