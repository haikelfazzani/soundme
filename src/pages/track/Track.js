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

  if (details.track && Object.keys(details.track).length > 0) {
    return (
      <div className="container py-3 mb-5 min-vh-100">

        <CardHorizontal track={details.track} data={details.infos} bg="bg-orange" />

        <div className="comments">
          <Comments comments={details.comments} />
        </div>
      </div>
    );
  }
  else {
    return <div className="container py-3 mb-5 min-vh-100">
      <Skeleton />
      <Spinner />
    </div>
  }
}

export default withRouter(Track);
