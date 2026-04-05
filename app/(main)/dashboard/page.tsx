"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import UploadModal from "@/components/modals/UploadModal";

export default function Dashboard() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Dashboard Header */}
      <header className="flex justify-between items-center mb-12 max-w-7xl mx-auto">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tighter">
            Your <span className="text-green-500">Studio</span>
          </h1>
          <p className="text-slate-500 font-mono text-xs uppercase tracking-widest mt-1">
            Manage your distributed assets
          </p>
        </div>

        {/* The Trigger Button */}
        <button
          onClick={() => setIsUploadOpen(true)}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black px-6 py-3 rounded-2xl font-bold transition-all active:scale-95 shadow-[0_0_20px_rgba(34,197,94,0.2)]"
        >
          <Plus size={20} />
          <span>Upload Video</span>
        </button>
      </header>

      {/* Video Grid Placeholder */}
      <section className="max-w-7xl mx-auto border-2 border-dashed border-white/5 rounded-[2.5rem] h-[60vh] flex items-center justify-center">
        <p className="text-slate-600 font-mono text-sm uppercase">
          No videos processed yet
        </p>
      </section>

      {/* The Modal Component */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
      />
    </div>
  );
}
