import React, { useEffect, useState, useContext } from 'react';
import GlobalContext from '../providers/GlobalContext';

import { useParams, withRouter } from 'react-router-dom';
import ScUserService from '../services/ScUserService';
import Card from '../components/Card';

import Skeleton from '../components/Skeleton';
import Spinner from '../components/Spinner';

import formatNum from '../util/formatNum';

import '../styles/User.css';

function User () {

  const { state } = useContext(GlobalContext);
  const [userInfos, setUserInfos] = useState({});
  const [userTracks, setUserTracks] = useState([]);
  const [userProfiles, setUserProfiles] = useState([]);

  let params = useParams();

  useEffect(() => {
    ScUserService.getInfosAndTracks(params.id)
      .then(result => {
        setUserInfos(result.details);
        setUserTracks(result.tracks);
        setUserProfiles(result.profiles);
      })
      .catch(e => {})
  }, []);

  return (<>
    {Object.keys(userInfos).length > 0
      ? <div className="container py-3 min-vh-100">
        <div className="card mb-3">
          <div className="row no-gutters">

            <div className="col-md-2 pr-2">
              <img
                src={userInfos.avatar_url.replace('large.jpg', 't300x300.jpg')}
                className="card-img"
                alt={userInfos.username}
                style={{ maxWidth: '162px' }}
              />
            </div>

            <div className="col-md-10">
              <div className="card-body flex-column">

                <div className="w-100 d-flex justify-content-between align-items-center">
                  <h5 className="card-title fs-18 mb-0">
                    {userInfos.username} <span><i className={"fas fa-circle fs-12 " + (userInfos.online ? 'text-sucess' : 'text-danger')}></i></span>
                  </h5>

                  <div className="mb-2 user-infos">
                    <span className="badge badge-primary mr-2"><i className="fas fa-volume-up"></i> {userInfos.track_count} tracks</span>
                    <span className="badge badge-primary mr-2"><i className="fab fa-gratipay"></i> {userInfos.public_favorites_count} favorites</span>
                    <span className="badge badge-primary mr-2"><i className="fas fa-users"></i> {userInfos.followings_count} followings</span>
                    <span className="badge badge-primary mr-2">
                      <i className="fas fa-user-friends"></i> {formatNum(userInfos.followers_count)} followers
                      </span>
                  </div>
                </div>

                <p className="card-text fs-14 country mb-2">
                  <small className="text-muted">
                    <i className="fas fa-street-view"></i> {userInfos.city}, {userInfos.country}
                  </small>
                </p>

                <p className="card-text fs-14 user-desc mb-3">{userInfos.description}</p>

                <div>
                  {userProfiles.map(up => <a href={up.service} target="_blank" className="fs-12 mr-2 text-uppercase ltsp"
                    rel="noopener noreferrer" key={up.id}>
                    <i className="fas fa-external-link-square-alt"></i> {up.service}
                  </a>)}
                </div>

              </div>

            </div>
          </div>
        </div>

        <div className="row">
          {userTracks.map((track, i) => <div className="col-md-3 mb-3" key={track.id}>
            {state.currentTrackPlay.id === track.id
              ? <Card track={track} />
              : <Card track={track} active={true} />}
          </div>)}
        </div>

      </div>
      : <div className="container py-3 mb-5">
        <Skeleton />
        <Spinner />
      </div>}
  </>);
}

export default withRouter(User);