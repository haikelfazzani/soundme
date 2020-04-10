import axios from 'axios';

export default class LyricsService {
  static async getLyric (artist, title) {
    let resp = 'Not found';
    if (artist.length > 0 && title.length > 0) {

      try {
        artist = artist.toLowerCase().trim();
        title = title.toLowerCase().trim();

        resp = await axios.get(`https://api.lyrics.ovh/v1/${artist}/${title}`);
        return resp.data.lyrics;
      } catch (error) {
        return resp;
      }
    }
    else return resp;
  }
}