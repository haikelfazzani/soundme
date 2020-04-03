import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ScUserService from '../../services/ScUserService';

import CardHorizontal from '../../components/CardHorizontal';
import ListTracks from './ListTracks';
import Comments from './Comments';

import Spinner from '../../components/Skeleton';
import Skeleton from '../../components/Spinner';

import '../../styles/TrackDetails.css';

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
      {details.track && Object.keys(details.track).length > 3
        ? <div className="row">

          <div className="col-md-8">
            <CardHorizontal track={details.track} bg="bg-orange" active={false} isList={false} />
            <ListTracks tracks={details.tracks} />
          </div>

          <div className="col-md-4 comments">
            {details.comments.length > 0 && <Comments comments={details.comments} />}
          </div>
        </div>

        : <>
          <Skeleton />
          <Spinner />
        </>}
    </div>
  );
}