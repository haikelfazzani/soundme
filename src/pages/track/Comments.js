import React from 'react';

const Comment = ({ comment }) => (
  <li className="w-100 bg-dark d-flex">
    <img
      src={comment.user.avatar_url}
      alt={comment.body}
      className="rounded-circle mr-3"
    />

    <div className="w-100 fs-12 text-wrap">
      <p className="m-0 text-break">{comment.body}</p>
      <div className="w-100 d-flex justify-content-between">
        <small className="text-muted">@{comment.user.username}</small>
        <small className="text-muted">{comment.created_at.slice(0,19)}</small>
      </div>
    </div>
  </li>
)

export default function Comments ({ comments }) {
  return <>

    <div className="list-group-item text-dark bg-dark">
      <i className="fas fa-comments"></i> Comments
    </div>

    <ul className="list-group">
      {comments.map(comment => <Comment comment={comment} key={'c' + comment.id} />)}
    </ul>
  </>
}
