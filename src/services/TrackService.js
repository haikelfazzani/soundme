import axios from 'axios';

export default class TrackService {

  static async getKey () {
    const api = await axios.get('https://bitbucket.org/!api/2.0/snippets/haikel2090/rn8a68/7f86164ec21e567b483c6fc33a2732147f585689/files/no.json');
    return api.data.api;
  }

  static async initSc () {
    const api_data = await this.getKey();
    window.SC.initialize({ client_id: api_data });
  }

  static async getTracks (genre) {
    await this.initSc();
    const tracks = await window.SC.get('/tracks', { genres: genre || 'rock', limit: 98 });
    return tracks;
  }

  static async searchQuery (query) {
    await this.initSc();
    query = encodeURIComponent(query);
    const tracks = await window.SC.get('/tracks', { q: query, limit: 98 });
    return tracks;
  }
}