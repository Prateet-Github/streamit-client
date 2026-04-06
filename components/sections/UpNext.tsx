import { Play } from "lucide-react";

const UpNext = () => {
  return (
    <aside className="space-y-6">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500">
          Up Next
        </h3>
        <span className="text-[10px] font-mono text-green-500 uppercase tracking-widest">
          Autoplay On
        </span>
      </div>

      <div className="space-y-5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex gap-3 group cursor-pointer group">
            {/* Small Thumbnail Preview */}
            <div className="relative w-40 aspect-video bg-white/5 rounded-2xl overflow-hidden shrink-0 border border-white/5">
              <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Play size={20} className="text-green-500" />
              </div>
            </div>

            {/* Sidebar Metadata */}
            <div className="space-y-1 py-1">
              <h4 className="text-sm font-bold text-white line-clamp-2 leading-tight group-hover:text-green-500 transition-colors">
                Distributed Pipeline Systems: Vol. {i}
              </h4>
              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-tighter">
                StreamIt Engineering
              </p>
              <p className="text-[10px] text-slate-600">
                42K views • 1 day ago
              </p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default UpNext;
