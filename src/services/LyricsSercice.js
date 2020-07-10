import axios from 'axios-jsonp-pro';

export default class LyricsService {

  static async getLyric (artist, title) {

    let resp = 'Not found';
    let infos = {};

    if (artist.length > 0 && title.length > 0) {

      try {
        artist = artist.toLowerCase().trim();
        title = title.toLowerCase().trim();

        resp = await axios.get(`https://api.lyrics.ovh/v1/${artist}/${title}`);
        infos = await this.getLyricInfo(artist, title);

        return {
          lyric: resp.data.lyrics,
          infos
        };
      } catch (error) {
        return {
          lyric: null,
          infos: {}
        };
      }
    }
    else return resp;
  }

  static async getLyricInfo (artist, title) {

    try {
      let url = `https://api.deezer.com/search/track/autocomplete?limit=1&q=${title}&output=jsonp`;

      let jsonp = await axios.jsonp(url);
      let resp = await jsonp.data[0];

      return {
        preview: resp.preview,
        duration: resp.duration,
        image: resp.artist.picture_big
      };
    } catch (error) {
      return null;
    }
  }
}