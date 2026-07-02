"use client";

import { useState } from "react";
import { useReplies, useAddReply, useDeleteComment } from "@/queries/comment";
import Image from "next/image";
import { formatTime } from "@/utils/time";
import { useCurrentUser } from "@/queries/auth";

type Props = {
  comment: any;
  videoId: string;
};

export default function CommentItem({ comment, videoId }: Props) {
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const { data: replies, isLoading } = useReplies(comment.id, showReplies);

  const addReply = useAddReply(comment.id, videoId);
  const deleteComment = useDeleteComment(videoId);

  const { data: currentUser } = useCurrentUser();

  const canDelete = currentUser?.id === comment.user.id;

  return (
    <div className="flex gap-3">
      {/* Avatar */}
      <Image
        src="/pfp.jpg"
        alt="User avatar"
        width={36}
        height={36}
        className="w-9 h-9 rounded-full object-cover shrink-0"
      />

      {/* Content */}
      <div className="flex-1">
        {/* Name + Time */}
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-white">
            {comment.user.name}
          </p>

          <span className="text-xs text-slate-500">
            {formatTime(comment.createdAt)}
          </span>
        </div>

        {/* Comment */}
        <p className="text-sm text-slate-300 mt-1 leading-relaxed">
          {comment.content}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
          <button className="hover:text-white transition">Like</button>

          <button
            onClick={() => setShowReplyInput((prev) => !prev)}
            className="hover:text-white transition"
          >
            Reply
          </button>

          {currentUser?.id === comment.user.id && (
            <button
              onClick={() => deleteComment.mutate(comment.id)}
              className="text-red-500 hover:text-red-400 transition"
            >
              Delete
            </button>
          )}
        </div>

        {/* Reply Input */}
        {showReplyInput && (
          <div className="flex gap-2 mt-3">
            <Image
              src="/pfp.jpg"
              alt="User avatar"
              width={28}
              height={28}
              className="w-7 h-7 rounded-full object-cover shrink-0"
            />

            <div className="flex-1">
              <input
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
                className="w-full bg-transparent border-b border-white/10 px-1 py-1 text-xs outline-none focus:border-white/30"
              />

              <div className="flex justify-end gap-2 mt-1">
                <button
                  onClick={() => {
                    setReplyContent("");
                    setShowReplyInput(false);
                  }}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    if (!replyContent.trim()) return;

                    addReply.mutate(
                      {
                        content: replyContent,
                      },
                      {
                        onSuccess: () => {
                          setReplyContent("");
                          setShowReplyInput(false);
                          setShowReplies(true);
                        },
                      },
                    );
                  }}
                  className="text-xs bg-green-500 text-black px-3 py-1 rounded-full"
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Replies Toggle */}
        {comment.repliesCount > 0 && (
          <button
            onClick={() => setShowReplies((prev) => !prev)}
            className="mt-2 text-xs font-semibold text-blue-400 hover:text-blue-300 transition"
          >
            {showReplies
              ? "Hide replies"
              : `View ${comment.repliesCount} replies`}
          </button>
        )}

        {/* Replies */}
        {showReplies && (
          <div className="mt-4 pl-4 border-l border-white/10 space-y-4">
            {isLoading ? (
              <p className="text-xs text-slate-500">Loading replies...</p>
            ) : (
              replies?.map((reply: any) => (
                <div key={reply.id} className="flex gap-3">
                  <Image
                    src="/pfp.jpg"
                    alt="User avatar"
                    width={28}
                    height={28}
                    className="rounded-full mt-1 shrink-0"
                  />

                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-semibold text-white">
                        {reply.user.name}
                      </p>

                      <span className="text-[10px] text-slate-500">
                        {formatTime(reply.createdAt)}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mt-1">
                      {reply.content}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
