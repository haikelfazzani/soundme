import React from 'react';
import Comment from '../../components/Comment';

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
