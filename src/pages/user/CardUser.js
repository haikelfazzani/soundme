import React from 'react';
import Expander from '../../components/Expander';

// page user: left card -> user details and infos
export default function CardUser ({ userInfos,userProfiles }) {

  return (
    <div className="card card-user mb-3 box-none">

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
            <Expander text={userInfos.description} />
          </li>}

          {userProfiles.length > 0
            && userProfiles.map(up =>
              <li className="list-group-item pr-0 pl-0" key={up.id}>
                <a href={up.url} target="_blank"
                  className="text-uppercase ltsp d-flex justify-content-between align-items-center text-dark text-decoration-none"
                  rel="noopener noreferrer">
                  <span><i className="fas fa-globe mr-1"></i> _{up.service}</span>
                  <i className="fas fa-arrow-alt-circle-right"></i>
                </a>
              </li>)}
        </ul>
      </div>

    </div>
  );
}