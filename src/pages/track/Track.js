import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ScUserService from '../../services/ScUserService';

import Comments from './Comments';
import ListTracks from './ListTracks';

import Spinner from '../../components/Skeleton';
import Skeleton from '../../components/Spinner';

import '../../styles/TrackDetails.css';
import formatNum from '../../util/formatNum';
import timeFormat from '../../util/timeFormat';

export default function Track () {

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
      {Object.keys(details.track).length > 3
        ? <div className="row">

          <div className="col-md-8">
            <div className="w-100 p-3 bg-orange d-flex">
              <img
                src={details.track.artwork_url ? details.track.artwork_url : ''}
                className="img-header mr-2"
                alt={details.track.title}
              />

              <div className="w-100 d-flex flex-column justify-content-between">
                <div className="d-flex flex-column">
                  <h5 className="fs-18 m-0">{details.track.title}</h5>
                  <small>@{details.track.user.username}</small>
                  <small>{details.track.genre}</small>
                </div>

                <div className="fs-12 mt-1 w-100 d-flex justify-content-between">
                  <span><i className="fas fa-play"></i> <small>{formatNum(details.track.playback_count)}</small></span>
                  <span><i className="fas fa-thumbs-up"></i> <small>{formatNum(details.track.favoritings_count)}</small></span>
                  <span><i className="fas fa-share"></i> <small>{formatNum(details.track.reposts_count)}</small></span>
                  <span><i className="fas fa-comments"></i> <small>{details.track.comment_count}</small></span>
                  <span><i className="fas fa-clock"></i> <small>{timeFormat(details.track.duration / 1024)}</small></span>
                  <span><i className="fas fa-download"></i> <small>{details.track.download_count}</small></span>
                </div>
              </div>
            </div>

            <ListTracks tracks={details.tracks} />

          </div>
          {details.comments.length > 0 && <Comments comments={details.comments} />}
        </div>

        : <>
          <Skeleton />
          <Spinner />
        </>}
    </div>
  );
}