import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import ScUserService from '../../services/ScUserService';

import CardHorizontal from './CardHorizontal';
import Comments from './Comments';

import Spinner from '../../components/Skeleton';
import Skeleton from '../../components/Spinner';

import '../../styles/TrackDetails.css';

function Track (props) {

  const { userId, id } = useParams();
  const [details, setDetails] = useState({ track: {}, infos: [], comments: [] });

  useEffect(() => {
    ScUserService.getTrackAndComments(userId, id)
      .then(result => {
        setDetails({ track: result.track, infos: result.infos, comments: result.comments.slice(0, 100) });
      })
      .catch(e => {
        props.history.goBack();
      });
  }, [userId]);

  const onGoBack = () => {
    props.history.goBack();
  }

  return (
    <div className="container py-3 mb-5 min-vh-100">

      {details.track && Object.keys(details.track).length > 0
        ? <div className="position-relative">

          <button onClick={onGoBack} className="btn stand-btn position-absolute border-0"
            style={{ left: 0, top: '3x', zIndex: 9 }}>
            <i className="fas fa-hand-point-left"></i>
          </button>

          <div className="mb-3">
            <CardHorizontal track={details.track} data={details.infos} bg="bg-orange" />
          </div>

          <div className="comments">
            <Comments comments={details.comments} />
          </div>
        </div>

        : <>
          <Skeleton />
          <Spinner />
        </>}
    </div>
  );
}

export default withRouter(Track);
