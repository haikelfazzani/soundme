import axios from 'axios';

const PROXY_SERVER = process.env.REACT_APP_PROXY_SERVER;
const BASE_URL = 'https://api.soundcloud.com/tracks?linked_partitioning=1';
const VBASE_URL = 'https://api-v2.soundcloud.com/charts';

export default class ScService {

  static async initSc () {
    window.SC.initialize({ client_id: process.env.REACT_APP_SOUNDCLOUD_API_KEY });
  }

  static async getTracks (genre, limit = 48) {
    try {
      let url = `${BASE_URL}&limit=${limit}&offset=0&client_id=${process.env.REACT_APP_SOUNDCLOUD_API_KEY}&tags=${genre}`;
      const tracks = await axios.get(url);
      return tracks.data.collection;
    } catch (error) {

    }
  }

  // top tracks by genre (beta)
  static async topTracks (genre="pop") {
    genre = genre.toLowerCase().trim();
    const url = `${VBASE_URL}?kind=top&genre=soundcloud:genres:${genre}&client_id=${process.env.REACT_APP_SOUNDCLOUD_API_KEY}&limit=18&offset=1`;
    try {
      let resp = await axios.get(url);
      return resp.data.collection.map(r => r.track);
    } catch (error) {
      return null;
    }
  }

  static async getTracksBetween (genre, limit = 48, from, to) {
    try {
      let url = `${BASE_URL}&limit=${limit}&offset=0&client_id=${process.env.REACT_APP_SOUNDCLOUD_API_KEY}&created_at[from]=${from}%${to}&tags=${genre}`;
      const tracks = await axios.get(url);
      return tracks.data.collection;
    } catch (error) {

    }
  }

  static async searchQuery (query, limit = 96) {
    try {
      await this.initSc();
      query = encodeURIComponent(query);
      const tracks = await window.SC.get('/tracks', { q: query, limit });
      return tracks;
    } catch (error) {

    }
  }
}