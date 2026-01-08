// src/components/match/CommentTab.jsx
import { Skeleton } from "../ui/Skeleton";

export default function CommentTab({ comment }) {
  return (
    <div className="card card-comment">
      <b className="comment-title">📝 Commento partita</b>
      {!comment ? (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton width="70%" />
        </>
      ) : (
        <div className="comment-text">{comment}</div>
      )}
    </div>
  );
}

