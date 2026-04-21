"use client";
import { Match, NODE_HEIGHT, NODE_WIDTH } from "@/entities/tournament";
import { ReactNode, useMemo } from "react";

// export type MatchId = "m1" | "m2" | "m3" | "m4" | "sf1" | "sf2" | "final";
// type MatchLink = { from: MatchId; to: MatchId };
type Point = { x: number; y: number };
type SegmentPath = { d: string; key: string };
type MatchLink = { from: string; to: string };

function orthogonalPath(from: Point, to: Point, midX: number) {
  // M from -> H midX -> V to.y -> H to.x
  return `M ${from.x} ${from.y} H ${midX} V ${to.y} H ${to.x}`;
}

type Props = {
  children: ReactNode;
  matches: Match[];
  canvasSize: { width: number; height: number };
};

export const BracketConnections = ({
  children,
  matches,
  canvasSize,
}: Props) => {
  const links = useMemo<MatchLink[]>(
    () =>
      matches.flatMap((match) =>
        match.nextMatchId ? [{ from: match.id, to: match.nextMatchId }] : [],
      ),
    [matches],
  );

  const matchById = useMemo(
    () => new Map(matches.map((match) => [match.id, match])),
    [matches],
  );
  const paths = useMemo<SegmentPath[]>(() => {
    const nextPaths: SegmentPath[] = [];

    for (const { from, to } of links) {
      const fromMatch = matchById.get(from);
      const toMatch = matchById.get(to);
      if (!fromMatch || !toMatch) continue;

      const fromPoint: Point = {
        x: fromMatch.position.x + NODE_WIDTH,
        y: fromMatch.position.y + NODE_HEIGHT / 2,
      };
      const toPoint: Point = {
        x: toMatch.position.x,
        y: toMatch.position.y + NODE_HEIGHT / 2,
      };
      const offset = Math.min(80, (toPoint.x - fromPoint.x) / 2);
      const midX = fromPoint.x + offset;
      nextPaths.push({
        key: `${from}->${to}`,
        d: orthogonalPath(fromPoint, toPoint, midX),
      });
    }

    return nextPaths;
  }, [links, matchById]);

  return (
    <div
      className="relative"
      style={{ width: canvasSize.width, height: canvasSize.height }}
    >
      <svg
        className="absolute inset-0 pointer-events-none"
        width="100%"
        height="100%"
        viewBox={`0 0 ${canvasSize.width} ${canvasSize.height}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
          </marker>
        </defs>

        {paths.map((p) => (
          <path
            key={p.key}
            d={p.d}
            fill="none"
            className="text-white/35"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinejoin="round"
            markerEnd="url(#arrow)"
          />
        ))}
      </svg>

      {children}
    </div>
  );
};
