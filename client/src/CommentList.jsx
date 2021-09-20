import React from "react";

const CommentList = ({ comments }) => {
  const fetchedComments = comments.map((comment) => {
    return <li key={comment.id} className={comment.status==="pending"||comment.status==="approved"?null:"text-danger"}>{comment.status==="pending"||comment.status==="approved"?comment.content:"Comment rejected !"}</li>;
  });
  return <div>{fetchedComments}</div>;
};

export default CommentList;
