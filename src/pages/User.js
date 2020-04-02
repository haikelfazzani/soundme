import React, { useEffect, useState, useContext } from 'react';
import GlobalContext from '../providers/GlobalContext';

import { useParams, withRouter } from 'react-router-dom';
import ScUserService from '../services/ScUserService';

import InlineCard from '../components/InlineCard';
import Skeleton from '../components/Skeleton';
import Spinner from '../components/Spinner';

import formatNum from '../util/formatNum';

import '../styles/User.css';
import SkeletonUser from '../components/SkeletonUser';

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
        localStorage.setItem('sc-user-tracks', JSON.stringify(result.tracks));
      })
      .catch(e => { })
  }, [params.id]);

  const onTrackFilter = (e) => {
    let searchVal = (e.target.value).toLowerCase().trim();

    let userLocal = JSON.parse(localStorage.getItem('sc-user-tracks'));
    let filtredTrakcs = userLocal.filter(t => t.title.toLowerCase().includes(searchVal));
    filtredTrakcs = filtredTrakcs.length > 0 ? filtredTrakcs : userLocal;

    setUserTracks(filtredTrakcs);
  }

  return (
    <>
      <div className="list-genres">
        <div className="container">
          <ul className="overflow-auto">
            <li className="list-group-item cp fs-12 text-uppercase"><i className="fas fa-volume-up"></i> {userInfos.track_count} tracks</li>
            <li className="list-group-item cp fs-12 text-uppercase"><i className="fab fa-gratipay"></i> {userInfos.public_favorites_count} favorites</li>
            <li className="list-group-item cp fs-12 text-uppercase"><i className="fas fa-users"></i> {userInfos.followings_count} followings</li>
            <li className="list-group-item cp fs-12 text-uppercase"><i className="fas fa-user-friends"></i> {formatNum(userInfos.followers_count)} followers</li>
            <li className="list-group-item cp fs-12 text-uppercase p-0">
              <input
                type="search"
                onKeyUp={onTrackFilter}
                placeholder="Filter tracks.."
              />
            </li>
          </ul>
        </div>
      </div>

      <div className="container py-3 min-vh-100">

        <div className="row">
          <div className="col-md-3">

            {Object.keys(userInfos).length > 0
              ? <div className="card card-user mb-3 box-none">

                <img
                  src={userInfos.avatar_url.replace('large.jpg', 't500x500.jpg')}
                  className="card-img"
                  alt={userInfos.username}
                />

                <div className="card-body flex-column">
                  <ul className="list-group list-group-flush">

                    <li className="list-group-item pr-0 pl-0">
                      <h5 className="card-title fs-18 m-0">
                        <span>
                          <i className={"fas fa-circle " + (userInfos.online ? 'text-sucess' : 'text-danger')}></i>
                        </span> {userInfos.username}
                      </h5>
                    </li>

                    {userInfos.country && <li className="list-group-item pr-0 pl-0">
                      <p className="card-text country m-0">
                        <i className="fas fa-street-view"></i> {userInfos.city}, {userInfos.country}
                      </p>
                    </li>}

                    {userInfos.description && <li className="list-group-item pr-0 pl-0">
                      <p className="card-text fs-14 m-0 text-dark">
                        <i className="fas fa-info-circle"></i> {userInfos.description}</p>
                    </li>}

                    {userProfiles.length > 0
                      && userProfiles.map(up =>
                        <li className="list-group-item pr-0 pl-0" key={up.id}>
                          <a href={up.service} target="_blank"
                            className="text-uppercase ltsp d-flex justify-content-between align-items-center text-dark text-decoration-none"
                            rel="noopener noreferrer">
                            <span><i className="fas fa-globe mr-1"></i> _{up.service}</span>
                            <i className="fas fa-arrow-alt-circle-right"></i>
                          </a>
                        </li>)}
                  </ul>
                </div>

              </div>
              : <SkeletonUser />}
          </div>


          <div className="col-md-9">

            {Object.keys(userInfos).length > 0
              ? <div className="row">
                {userTracks.map((track, i) => <div className="col-md-4 mb-3" key={track.id}>
                  <InlineCard track={track} active={state.currentTrackPlay.id !== track.id} />
                </div>)}
              </div>
              : <><Skeleton /><Spinner /></>}
          </div>
        </div>

      </div>
    </>);
}

export default withRouter(User);