import { Match } from "@/entities/tournament";
import { cn } from "@/shared/lib";
import { Badge } from "@/shared/ui";
import { forwardRef } from "react";

type Props = {
  match: Match;
  index: number;
};

export const MatchNode = forwardRef<HTMLDivElement, Props>(
  ({ match, index }, ref) => {
    return (
      <div
        ref={ref}
        data-canvas-interactive
        className={cn("absolute w-[280px]")}
        style={{ left: match.position.x, top: match.position.y }}
      >
        <div className="rounded-2xl bg-panel/80 ring-1 ring-border shadow-[0_16px_50px_rgba(0,0,0,0.40)]">
          <div className="p-3 pb-2 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <div className="truncate text-[12px] font-semibold">
                Match {index}
              </div>
              <div className="text-[11px] text-muted-2">BO1 • Placeholder</div>
            </div>
            <Badge className="bg-white/5">R1</Badge>
          </div>

          <div className="px-3 pb-3 space-y-2">
            <div className="rounded-xl bg-white/5 ring-1 ring-border px-3 py-2 flex items-center justify-between">
              <div className="min-w-0">
                <div className="truncate text-[12px]">
                  {match.team1?.name ?? "—"}
                </div>
                <div className="text-[11px] text-muted-2">
                  {match.team1?.description}
                </div>
              </div>
              <div className="text-[12px] text-muted-2 tabular-nums">
                {match.score?.team1 ?? "—"}
              </div>
            </div>
            <div className="rounded-xl bg-white/4 ring-1 ring-border px-3 py-2 flex items-center justify-between">
              <div className="min-w-0">
                <div className="truncate text-[12px]">
                  {match.team2?.name ?? "—"}
                </div>
                <div className="text-[11px] text-muted-2">
                  {match.team2?.description}
                </div>
              </div>
              <div className="text-[12px] text-muted-2 tabular-nums">
                {match.score?.team2 ?? "—"}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

MatchNode.displayName = "MatchNode";
