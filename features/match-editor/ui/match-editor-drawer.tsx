"use client";

import { Match } from "@/entities/tournament";
import { Input } from "@/shared/ui";

type Props = {
  match: Match;
  isOpen: boolean;
  onClose: () => void;
};

export const MatchEditorDrawer = ({ match, isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div className="relative w-[420px] rounded-2xl bg-[#1a1a1a] border border-white/10 shadow-2xl">
        <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
          <div className="text-sm font-medium text-white">Edit Match</div>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            ✕
          </button>
        </div>

        <div className="p-4 space-y-3">
          <div>
            <div className="text-xs text-white/50 mb-1">Score Team 1</div>
            <Input
              value={match.score?.team1 ?? ""}
              onChange={() => {}}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-white/30"
            />
          </div>

          <div>
            <div className="text-xs text-white/50 mb-1">Score Team 2</div>
            <Input
              value={match.score?.team2 ?? ""}
              onChange={() => {}}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-white/30"
            />
          </div>
        </div>

        <div className="px-4 py-3 border-t border-white/10 flex justify-end gap-2">
          <button
            className="px-3 py-1.5 text-sm text-white/60 hover:text-white"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="px-3 py-1.5 text-sm bg-white text-black rounded-lg">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
