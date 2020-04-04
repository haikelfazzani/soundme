import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import ScUserService from '../../services/ScUserService';

import InlineList from '../../components/InlineList';
import CardHorizontal from '../../components/CardHorizontal';
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
      .catch(e => { })
  }, [params]);


  const onGoBack = () => {
    props.history.goBack();
  }

  return (
    <>
      <InlineList data={details.infos} />
      <div className="container py-3 mb-5 min-vh-100">

        <button onClick={onGoBack} className="btn btn-dark mb-3">
          <i className="fas fa-hand-point-left"></i>
        </button>

        {details.track && Object.keys(details.track).length > 0
          ? <div className="row">

            <div className="col-md-4">
              <CardHorizontal track={details.track} bg="bg-orange" />
            </div>

            <div className="col-md-8 comments">
              {details.comments.length > 0 && <Comments comments={details.comments} />}
            </div>
          </div>

          : <>
            <Skeleton />
            <Spinner />
          </>}
      </div>
    </>);
}

export default withRouter(Track);
