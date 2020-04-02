import React from 'react';
import formatNum from '../../util/formatNum';
import timeFormat from '../../util/timeFormat';

export default function ListTracks ({ tracks }) {
  return (
    <ul class="list-group mt-3">
      {tracks.map(track =>
        <li class="list-group-item bg-dark">
          <div class="d-flex w-100 justify-content-between">
            <h5 className="fs-14 m-0"><i className="fas fa-music"></i> {track.title}</h5>
            <span class="badge badge-dark badge-pill">{track.genre}</span>
          </div>

          <div className="fs-12 mt-1 text-muted w-50 d-flex justify-content-between">
            <span><i className="fas fa-play"></i> <small>{formatNum(track.playback_count)}</small></span>
            <span><i className="fas fa-thumbs-up"></i> <small>{formatNum(track.favoritings_count)}</small></span>
            <span><i className="fas fa-share"></i> <small>{formatNum(track.reposts_count)}</small></span>
            <span><i className="fas fa-comments"></i> <small>{track.comment_count}</small></span>
            <span><i className="fas fa-clock"></i> <small>{timeFormat(track.duration / 1024)}</small></span>
            <span><i className="fas fa-download"></i> <small>{track.download_count}</small></span>
          </div>
        </li>)}
    </ul>
  );
}