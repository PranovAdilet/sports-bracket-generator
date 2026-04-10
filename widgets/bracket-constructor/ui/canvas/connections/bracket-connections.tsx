"use client";
import {
  ReactNode,
  RefObject,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type MatchId = "m1" | "m2" | "m3" | "m4" | "sf1" | "sf2" | "final";
type MatchLink = { from: MatchId; to: MatchId };
type Point = { x: number; y: number };
type SegmentPath = { d: string; key: string };

function orthogonalPath(from: Point, to: Point, midX: number) {
  // M from -> H midX -> V to.y -> H to.x
  return `M ${from.x} ${from.y} H ${midX} V ${to.y} H ${to.x}`;
}

type Props = {
  children: ReactNode;
  nodeRefs: RefObject<Map<MatchId, HTMLDivElement>>;
};

export const BracketConnections = ({ children, nodeRefs }: Props) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [paths, setPaths] = useState<SegmentPath[]>([]);

  const links = useMemo<MatchLink[]>(
    () => [
      { from: "m1", to: "sf1" },
      { from: "m2", to: "sf1" },
      { from: "m3", to: "sf2" },
      { from: "m4", to: "sf2" },
      { from: "sf1", to: "final" },
      { from: "sf2", to: "final" },
    ],
    [],
  );

  useLayoutEffect(() => {
    const root = contentRef.current;
    if (!root) return;

    const calc = () => {
      const rootRect = root.getBoundingClientRect();
      const getCenterRight = (id: MatchId): Point | null => {
        const el = nodeRefs.current.get(id);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          x: r.right - rootRect.left,
          y: r.top - rootRect.top + r.height / 2,
        };
      };
      const getCenterLeft = (id: MatchId): Point | null => {
        const el = nodeRefs.current.get(id);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          x: r.left - rootRect.left,
          y: r.top - rootRect.top + r.height / 2,
        };
      };

      const nextPaths: SegmentPath[] = [];
      for (const { from, to } of links) {
        const a = getCenterRight(from);
        const b = getCenterLeft(to);
        if (!a || !b) continue;
        const OFFSET = Math.min(80, (b.x - a.x) / 2);
        const midX = a.x + OFFSET;
        nextPaths.push({
          key: `${from}->${to}`,
          d: orthogonalPath(a, b, midX),
        });
      }
      setPaths(nextPaths);
    };

    calc();

    const ro = new ResizeObserver(() => calc());
    ro.observe(root);
    for (const el of nodeRefs.current.values()) ro.observe(el);
    window.addEventListener("resize", calc);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", calc);
    };
  }, [links, nodeRefs.current]);

  return (
    <div ref={contentRef} className="relative h-[720px] w-[1500px]">
      <svg
        className="absolute inset-0 pointer-events-none"
        width="100%"
        height="100%"
        viewBox="0 0 1500 720"
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
