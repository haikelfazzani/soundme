import axios from 'axios';

export default class TrackService {

  static async getKey () {
    const api = await axios.get('https://bitbucket.org/!api/2.0/snippets/haikel2090/rn8a68/7f86164ec21e567b483c6fc33a2732147f585689/files/no.json');
    return api.data.api;
  }

  static async getTracks (genre) {
    const api_data = await this.getKey();
    const resp = await axios.get(`https://api.soundcloud.com/tracks?genres=${genre}&client_id=${api_data}`);
    await this.initSc();
    return resp.data;
  }

  static async initSc () {
    const api_data = await this.getKey();
    window.SC.initialize({ client_id: api_data });
  }

  static async searchQuery (query) {
    await this.initSc();
    query = encodeURIComponent(query);
    const tracks = await window.SC.get('/tracks', { q: query });
    console.log(tracks);
    
    return tracks;
  }
}