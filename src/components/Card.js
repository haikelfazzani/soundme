import React, { useContext } from 'react';
import '../styles/Card.css';
import placeImg from '../img/1.png';
import GlobalContext from '../providers/GlobalContext';

export default function Card ({ track }) {

  const { state, setState } = useContext(GlobalContext);

  const playTrack = (track) => {
    setState({
      ...state,
      currentTrackPlay: track,
      isPlaying: true
    });    
  }

  return <div className="card h-100">

    <div onClick={() => { playTrack(track); }} className="img-flip">
      <div className="fadeIn">
        {!state.isPlaying
          ? <i className="fas fa-play"></i>
          : <i className="fas fa-music"></i>}
      </div>
      <img src={track.artwork_url || placeImg} className="img-header" alt="..." />
    </div>

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