"use client";

import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useGetUrl } from "@/queries/video-url";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { Upload, Play, Info, X } from "lucide-react";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadModal = ({ isOpen, onClose }: UploadModalProps) => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [inputKey, setInputKey] = useState(Date.now());

  const videoPreviewUrl = useMemo(() => {
    return file ? URL.createObjectURL(file) : null;
  }, [file]);

  const { mutateAsync: getPresignedUrl, isPending: isGettingUrl } = useGetUrl();

  useEffect(() => {
    if (file && !title) {
      const clean = file.name.replace(/\.[^/.]+$/, "");
      setTitle(clean);
    }
  }, [file]);

  // prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleUpload = async () => {
    if (!file || !title.trim() || isUploading) return;

    try {
      setIsUploading(true);
      const { uploadUrl, key } = await getPresignedUrl(file);

      await axios.put(uploadUrl, file, {
        headers: { "Content-Type": file.type },
        onUploadProgress: (p) => {
          const percent = Math.round((p.loaded * 100) / (p.total || file.size));
          setUploadProgress(percent);
        },
      });

      await api.post("/video/confirm-upload", {
        title: title.trim(),
        description: description.trim(),
        s3Key: key,
      });

      onClose();
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={!isUploading ? onClose : undefined}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-[#0d0d0d] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#0a0a0a]">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Upload <span className="text-green-500">Video</span>
            </h2>
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mt-0.5">
              Pipeline Initialization
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={isUploading}
            className="p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-colors disabled:opacity-0"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT: Form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-1">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Video Title"
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-green-500/50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-1">
                  Description
                </label>
                <textarea
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What's this video about?"
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-green-500/50 transition-all resize-none"
                />
              </div>

              {!file && (
                <div className="relative group/file">
                  <input
                    key={inputKey}
                    type="file"
                    accept="video/*"
                    onChange={(e) =>
                      e.target.files && setFile(e.target.files[0])
                    }
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  />
                  <div className="border-2 border-dashed border-white/10 bg-white/2 rounded-3xl p-10 flex flex-col items-center justify-center group-hover/file:border-green-500/20 transition-all">
                    <Upload
                      className="text-slate-500 mb-3 group-hover/file:text-green-500 transition-colors"
                      size={32}
                    />
                    <p className="text-sm text-slate-400">
                      Click or drag to select video
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT: Preview & Status */}
            <div className="space-y-6">
              <div className="bg-black/40 border border-white/5 rounded-3xl overflow-hidden">
                <div className="aspect-video bg-black flex items-center justify-center relative">
                  {videoPreviewUrl ? (
                    <video
                      src={videoPreviewUrl}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Play size={32} className="text-slate-800" />
                  )}
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                      Progress
                    </span>
                    <span className="text-sm font-mono text-green-500">
                      {uploadProgress}%
                    </span>
                  </div>

                  <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden">
                    <div
                      className="bg-green-500 h-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>

                  <button
                    onClick={handleUpload}
                    disabled={!file || isUploading || isGettingUrl}
                    className="w-full py-4 rounded-xl bg-green-500 text-black font-bold text-xs uppercase tracking-widest hover:bg-green-400 transition-all disabled:opacity-20"
                  >
                    {isUploading ? "Transmitting..." : "Start Pipeline"}
                  </button>
                </div>
              </div>

              <div className="p-4 bg-green-500/5 border border-green-500/10 rounded-2xl flex gap-3">
                <Info size={16} className="text-green-500 shrink-0" />
                <p className="text-[10px] text-green-500/60 font-mono leading-relaxed">
                  Assets will be sharded into HLS chunks. This process is
                  asynchronous.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
