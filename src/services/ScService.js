import axios from 'axios';

export default class ScService {

  static async getKey () {
    const api = await axios.get('https://bitbucket.org/!api/2.0/snippets/haikel2090/rn8a68/7f86164ec21e567b483c6fc33a2732147f585689/files/no.json');
    return api.data.api;
  }

  static async initSc () {
    const api_data = await this.getKey();
    window.SC.initialize({ client_id: api_data });
  }

  static async getTracks (genre) {
    let localGenre = this.getLocalGenreTracks(genre);
    if (localGenre) {
      return [];
    }
    else {
      await this.initSc();
      const tracks = await window.SC.get('/tracks', { genres: genre || 'rock', limit: 98 });
      localStorage.setItem('sc-genre', genre);
      return tracks;
    }
  }

  static async searchQuery (query) {
    let localQuery = localStorage.getItem('sc-search-query');
    if (localQuery.trim() === query.trim()) {
      return JSON.parse(localStorage.getItem('sc-search-query-tracks'));
    }
    else {
      await this.initSc();
      query = encodeURIComponent(query);
      const tracks = await window.SC.get('/tracks', { q: query, limit: 98 });
      localStorage.setItem('sc-search-query-tracks', JSON.stringify(tracks));
      localStorage.setItem('sc-search-query', query);
      return tracks;
    }
  }

  /**
   * Get Genre tracks from localStorage
   * if the user click the same Genre section, data will be fetched from localStorage
   */
  static getLocalGenreTracks (genre) {
    let localGenre = localStorage.getItem('sc-genre');
    return localGenre && localGenre === genre;
  }
}