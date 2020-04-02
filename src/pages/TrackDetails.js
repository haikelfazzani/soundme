import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ScUserService from '../services/ScUserService';
import '../styles/TrackDetails.css';
import formatNum from '../util/formatNum';
import timeFormat from '../util/timeFormat';

const Comment = ({ comment }) => (
  <li className="w-100 bg-dark d-flex border-bottom">
    <img src={comment.user.avatar_url} alt={comment.body} style={{width:'50px',height:'50px'}} className="rounded-circle mr-2" />
    <div className="py-2">
      <h5 className="fs-14 mb-1">{comment.body}</h5>
      <small className="fs-12 text-muted">@{comment.user.username}</small>
      {/* <small className="fs-12 text-muted">{comment.created_at}</small>       */}
    </div>
  </li>
)

const Comments = ({ comments }) => (
  <div className="col-md-4">
    <div className="list-group-item text-dark bg-dark"><i className="fas fa-comments"></i> Comments</div>
    <ul className="list-group" style={{maxHeight:'400px', overflow:'auto'}}>      
      {comments.map(comment => <Comment comment={comment} key={'c' + comment.id} />)}
    </ul>
  </div>
)

export default function TrackDetails () {

  const params = useParams();
  const [details, setDetails] = useState({ track: {}, tracks: [], comments: [] });

  useEffect(() => {
    ScUserService.getTrackComments(params.id)
      .then(comments => {

        let tracks = JSON.parse(localStorage.getItem('sc-user-tracks'));
        let currTrack = tracks.find(t => t.id === parseInt(params.id, 10));

        setDetails({ ...details, track: currTrack, tracks, comments });
      })
      .catch(e => { })

  }, [params]);


  return (
    <div className="container py-3 mb-5 min-vh-100">
      <div className="row">

        <div className="col-md-8">
          {Object.keys(details.track).length > 3
            && <div className="w-100 p-3 bg-orange d-flex">
              <img
                src={details.track.artwork_url ? details.track.artwork_url : ''}
                className="img-header mr-2"
                alt={details.track.title}
              />

              <div className="d-flex flex-column justify-content-between">
                <div className="d-flex flex-column">
                  <h5 className="fs-18 m-0">{details.track.title}</h5>                  
                  <small>@{details.track.user.username}</small>
                  <small>{details.track.genre}</small>
                </div>

                <div className="fs-12 mt-1 d-flex justify-content-between">
                  <span><i className="fas fa-play"></i> <small>{formatNum(details.track.playback_count)}</small></span>
                  <span><i className="fas fa-thumbs-up"></i> <small>{formatNum(details.track.favoritings_count)}</small></span>
                  <span><i className="fas fa-share"></i> <small>{formatNum(details.track.reposts_count)}</small></span>
                  <span><i className="fas fa-comments"></i> <small>{details.track.comment_count}</small></span>
                  <span><i className="fas fa-clock"></i> <small>{timeFormat(details.track.duration / 1024)}</small></span>
                  <span><i className="fas fa-download"></i> <small>{details.track.download_count}</small></span>
                </div>
              </div>
            </div>}

          <ul class="list-group mt-3">
            {details.tracks.map(track =>
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

        </div>
        {details.comments.length > 0 && <Comments comments={details.comments} />}
      </div>
    </div>
  );
}