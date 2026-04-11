import { Play } from "lucide-react";
import type { VideoPlaceholder as VideoData } from "@/assets/data/levels";

export function VideoPlaceholder({ video }: { video: VideoData }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-slate-100 to-slate-200 transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:from-slate-800 dark:to-slate-700 sm:rounded-2xl">
      {video.videoUrl ? (
        <div className="aspect-video overflow-hidden bg-black">
          <video
            controls
            preload="metadata"
            className="h-full w-full object-cover"
            src={video.videoUrl}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <div className="flex aspect-video items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-center px-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/80 shadow-lg transition-transform duration-300 group-hover:scale-110 dark:bg-slate-600">
              <Play className="h-8 w-8 text-slate-500 dark:text-slate-300" />
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Video will be added here
            </p>
          </div>
        </div>
      )}
      <div className="border-t border-slate-200 bg-white/80 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/80">
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          {video.title}
        </p>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          {video.description}
        </p>
      </div>
    </div>
  );
}
