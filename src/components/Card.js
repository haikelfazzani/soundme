import React from 'react';
import '../styles/Card.css';
import placeImg from '../img/1.png';

export default function Card ({track}) {

  const playTrack = (trackId) => {
    window.SC.stream('/tracks/' + trackId)
      .then(function (player) {
        player.play();
      });
  }

  return <div className="card h-100" onClick={() => { playTrack(track.id) }}>

    <img src={track.artwork_url || placeImg} className="img-header" alt="..." />
    <div className="card-body">
      <img src={track.user.avatar_url} className="mr-2" alt="..." />
      <div>
        <h5 className="card-title m-0">{track.title}</h5>
        <p className="card-text m-0">{track.user.username}</p>
      </div>
    </div>
    {/* <div className="card-footer text-muted">
      <span className="badge badge-dark"><i className="fas fa-share-alt"></i> {track.reposts_count}</span>
      <span className="badge badge-dark"><i className="fas fa-download"></i> {track.download_count}</span>
      <span className="badge badge-dark"><i className="fas fa-thumbs-up"></i> {track.likes_count}</span>
    </div> */}
  </div>;
}