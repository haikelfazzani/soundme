import React from 'react';
import Img from './Img';
import '../styles/CardHorizontal.css';

export default function CardHorizontal ({ track }) {

  return (
    <div className="card card-horizontal mb-3">

      <Img
        src={track.artwork_url ? track.artwork_url.replace('large.jpg', 't500x500.jpg') : null}
        clx="img-header"
        alt={track.title}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title color-orange">{track.title}</h5>
        <p className="card-text m-0">@{track.user.username}</p>
        <p className="card-text m-0"><i className="fas fa-drum"></i> {track.genre}</p>
      </div>
    </div>
  );
}