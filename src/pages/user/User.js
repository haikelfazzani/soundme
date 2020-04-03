import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';
import ScUserService from '../../services/ScUserService';

import CardUser from './CardUser';
import MediaObject from './MediaObject';

import Spinner from '../../components/Spinner';
import Skeleton from '../../components/Skeleton';
import SkeletonUser from '../../components/SkeletonUser';

import formatNum from '../../util/formatNum';

import '../../styles/User.css';

function User () {

  const currentTrackPlay = useStoreState(state => state.currentTrackPlay);
  const [user, setUser] = useState({ infos: [], tracks: [], profiles: [] });

  let params = useParams();

  useEffect(() => {
    ScUserService.getInfosAndTracks(params.id)
      .then(result => {
        setUser({ infos: result.details, tracks: result.tracks, profiles: result.profiles });
        localStorage.setItem('sc-user-tracks', JSON.stringify(result.tracks));
      })
      .catch(e => { })
  }, [params.id]);

  const onTrackFilter = (e) => {
    let searchVal = (e.target.value).toLowerCase().trim();

    let userLocal = JSON.parse(localStorage.getItem('sc-user-tracks'));
    let filtredTrakcs = userLocal.filter(t => t.title.toLowerCase().includes(searchVal));
    filtredTrakcs = filtredTrakcs.length > 0 ? filtredTrakcs : userLocal;

    setUser({ ...user, tracks: filtredTrakcs });
  }

  return (
    <>
      <div className="list-genres">
        <div className="container">
          <ul className="overflow-auto">
            <li className="list-group-item cp fs-12 text-uppercase"><i className="fas fa-volume-up"></i> {user.infos.track_count} tracks</li>
            <li className="list-group-item cp fs-12 text-uppercase"><i className="fab fa-gratipay"></i> {user.infos.public_favorites_count} favorites</li>
            <li className="list-group-item cp fs-12 text-uppercase"><i className="fas fa-users"></i> {user.infos.followings_count} followings</li>
            <li className="list-group-item cp fs-12 text-uppercase"><i className="fas fa-user-friends"></i> {formatNum(user.infos.followers_count)} followers</li>
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
            {Object.keys(user.infos).length > 0
              ? <CardUser userInfos={user.infos} userProfiles={user.profiles} />
              : <SkeletonUser />}
          </div>


          <div className="col-md-9">
            {Object.keys(user.infos).length > 0
              ? <div className="row">
                {user.tracks.map((track, i) => <div className="col-md-4 mb-3" key={track.id}>
                  <MediaObject track={track} active={currentTrackPlay.id !== track.id} />
                </div>)}
              </div>
              : <><Skeleton /><Spinner /></>}
          </div>

        </div>
      </div>
    </>);
}

export default withRouter(User);