"use client";

import { useState } from "react";
import { useAddComment, useComments } from "@/queries/comment";
import CommentItem from "./CommentItem";

const CommentSection = ({ videoId }: { videoId: string }) => {
  const [content, setContent] = useState("");

  const { data, isLoading } = useComments(videoId);
  const addComment = useAddComment(videoId);

  const handleSubmit = () => {
    if (!content.trim()) return;

    addComment.mutate(
      { content },
      {
        onSuccess: () => {
          setContent("");
        },
      },
    );
  };

  return (
    <div className="mt-10 space-y-6">
      {/* Add Comment */}
      <div className="flex gap-3">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 bg-white/5 border border-white/10 px-4 py-2 rounded-xl outline-none"
        />
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-black px-4 py-2 rounded-xl font-bold"
        >
          Post
        </button>
      </div>

      {/* Comments */}
      {isLoading ? (
        <p className="text-slate-500 text-sm">Loading comments...</p>
      ) : (
        <div className="space-y-6">
          {data?.comments.map((comment: any) => (
            <CommentItem key={comment._id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
