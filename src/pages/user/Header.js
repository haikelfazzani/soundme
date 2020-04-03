import React from 'react';
import formatNum from '../../util/formatNum';

export default function Header ({ children, user }) {
  return (
    <div className="list-genres">
      <div className="container">
        <ul className="overflow-auto">
          <li className="list-group-item cp fs-12 text-uppercase"><i className="fas fa-volume-up"></i> {user.infos.track_count} tracks</li>
          <li className="list-group-item cp fs-12 text-uppercase"><i className="fab fa-gratipay"></i> {user.infos.public_favorites_count} favorites</li>
          <li className="list-group-item cp fs-12 text-uppercase"><i className="fas fa-users"></i> {user.infos.followings_count} followings</li>
          <li className="list-group-item cp fs-12 text-uppercase">
            <i className="fas fa-user-friends"></i> {formatNum(user.infos.followers_count)} followers
          </li>

          {children}

        </ul>

      </div>
    </div>
  );
}