"use client";

import { useState } from "react";
import axios from "axios";
import { useGetUrl } from "@/queries/video-url";
import { useRouter } from "next/navigation";
import api from "@/services/api";

const UploadVideo = () => {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);

  const [inputKey, setInputKey] = useState(Date.now());

  const { mutateAsync: getPresignedUrl, isPending: isGettingUrl } = useGetUrl();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");

    try {
      setIsUploading(true);
      setUploadProgress(0);

      // 1. Get presigned URL
      const { uploadUrl, key } = await getPresignedUrl(file);

      // 2. Upload to S3 (use axios directly)
      await axios.put(uploadUrl, file, {
        headers: { "Content-Type": file.type },
        onUploadProgress: (p) => {
          const percent = Math.round((p.loaded * 100) / (p.total || file.size));
          setUploadProgress(percent);
        },
      });

      // 3. Notify backend (use api helper → adds auth automatically)
      const res = await api.post("/video/confirm-upload", {
        title: file.name,
        description: "Uploaded video",
        s3Key: key,
      });

      // 4. Redirect to dashboard (better UX)
      router.push("/dashboard");

      alert("Upload successful & processing started!");

      setFile(null);
      setUploadProgress(0);
      setInputKey(Date.now());
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white p-6">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-700">
        <h1 className="text-2xl font-bold mb-6 text-center">StreamIt Upload</h1>

        <input
          key={inputKey}
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-blue-400 hover:file:bg-gray-600 mb-6"
        />

        {uploadProgress > 0 && (
          <div className="w-full bg-gray-700 rounded-full h-4 mb-6 overflow-hidden">
            <div
              className="bg-blue-500 h-full transition-all duration-300 ease-out"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || isUploading || isGettingUrl}
          className={`w-full p-4 rounded-2xl font-bold transition-all ${
            !file || isUploading
              ? "bg-gray-600"
              : "bg-blue-600 hover:bg-blue-500"
          }`}
        >
          {isUploading
            ? `Uploading ${uploadProgress}%`
            : isGettingUrl
              ? "Preparing upload..."
              : "Start Upload"}
        </button>
      </div>
    </main>
  );
};

export default UploadVideo;
