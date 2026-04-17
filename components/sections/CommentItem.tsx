"use client";

import { useState } from "react";
import { useReplies } from "@/queries/comment";

export default function CommentItem({ comment }: any) {
  const [showReplies, setShowReplies] = useState(false);

  const { data } = useReplies(comment._id, showReplies);

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold">{comment.user.name}</p>
      <p className="text-sm text-slate-400">{comment.content}</p>

      {/* Replies toggle */}
      {comment.repliesCount > 0 && (
        <button
          onClick={() => setShowReplies((prev) => !prev)}
          className="text-xs text-green-500"
        >
          {showReplies
            ? "Hide replies"
            : `View ${comment.repliesCount} replies`}
        </button>
      )}

      {/* Replies */}
      {showReplies && (
        <div className="ml-6 space-y-2">
          {data?.replies.map((reply: any) => (
            <div key={reply._id}>
              <p className="text-xs font-semibold">{reply.user.name}</p>
              <p className="text-xs text-slate-400">{reply.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
