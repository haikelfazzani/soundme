import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import ScUserService from '../../services/ScUserService';

import CardHorizontal from './CardHorizontal';
import Comments from './Comments';

import Spinner from '../../components/Skeleton';
import Skeleton from '../../components/Spinner';

import '../../styles/TrackDetails.css';

function Track (props) {

  const params = useParams();
  const [details, setDetails] = useState({ track: {}, infos: [], comments: [] });

  useEffect(() => {
    ScUserService.getTrackAndComments(params.userId, params.id)
      .then(result => {
        setDetails({ track: result.track, infos: result.infos, comments: result.comments });
      })
      .catch(e => {
        props.history.goBack();
      });
  }, [params]);


  const onGoBack = () => {
    props.history.goBack();
  }

  return (
    <div className="container py-3 mb-5 min-vh-100">

      <button onClick={onGoBack} className="btn btn-dark mb-3">
        <i className="fas fa-hand-point-left"></i>
      </button>

      {details.track && Object.keys(details.track).length > 0
        ? <div>

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
