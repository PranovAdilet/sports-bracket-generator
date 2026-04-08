"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Transform = { x: number; y: number; scale: number };

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

function nextPow2(n: number) {
  return Math.pow(2, Math.round(Math.log2(n)));
}

 type Props = {
    grid?: "none" | "dots" | "lines";
    minScale?: number;
    maxScale?: number;
    initialScale?: number;
    initialX?: number;
    initialY?: number;
    onTransformChange?: (t: Transform) => void;
  };

export const usePanZoom = ({
    grid = "lines",
    minScale = 0.35,
    maxScale = 2.5,
    initialScale = 1,
    initialX = 48,
    initialY = 48,
    onTransformChange
} : Props) => {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const [t, setT] = useState<Transform>(() => ({
      x: initialX,
      y: initialY,
      scale: clamp(initialScale, minScale, maxScale),
    }));
  
    const dragRef = useRef<{
      active: boolean;
      pointerId: number | null;
      startX: number;
      startY: number;
      baseX: number;
      baseY: number;
    }>({
      active: false,
      pointerId: null,
      startX: 0,
      startY: 0,
      baseX: 0,
      baseY: 0,
    });
    
    useEffect(() => {
        onTransformChange?.(t);
      }, [t, onTransformChange]);

      const setTransform = useCallback(
        (updater: (prev: Transform) => Transform) => {
          setT((prev) => {
            const next = updater(prev);
            return {
              x: Number.isFinite(next.x) ? next.x : prev.x,
              y: Number.isFinite(next.y) ? next.y : prev.y,
              scale: clamp(
                Number.isFinite(next.scale) ? next.scale : prev.scale,
                minScale,
                maxScale,
              ),
            };
          });
        },
        [minScale, maxScale],
      );
    
      const onPointerDown = useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
          // Пан — ЛКМ по пустому месту (или средняя кнопка).
          // Не блокируем интерактив внутри контента: кнопки/инпуты и т.п.
          const target = e.target as HTMLElement | null;
          if (target?.closest?.("[data-canvas-interactive]")) return;
    
          if (e.button !== 0 && e.button !== 1) return;
          e.preventDefault();
    
          dragRef.current.active = true;
          dragRef.current.pointerId = e.pointerId;
          dragRef.current.startX = e.clientX;
          dragRef.current.startY = e.clientY;
          dragRef.current.baseX = t.x;
          dragRef.current.baseY = t.y;
    
          (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
        },
        [t.x, t.y],
      );
    
      const onPointerMove = useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
          const d = dragRef.current;
          if (!d.active || d.pointerId !== e.pointerId) return;
          e.preventDefault();
          const dx = e.clientX - d.startX;
          const dy = e.clientY - d.startY;
          setTransform((prev) => ({ ...prev, x: d.baseX + dx, y: d.baseY + dy }));
        },
        [setTransform],
      );
    
      const onPointerUp = useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
          const d = dragRef.current;
          if (d.pointerId !== e.pointerId) return;
          d.active = false;
          d.pointerId = null;
        },
        [],
      );
    
      const onWheel = useCallback(
        (e: React.WheelEvent<HTMLDivElement>) => {
          const el = rootRef.current;
          if (!el) return;
          if (e.ctrlKey) return; // оставим pinch-to-zoom браузеру
          e.preventDefault();
    
          const rect = el.getBoundingClientRect();
          const px = e.clientX - rect.left;
          const py = e.clientY - rect.top;
    
          const intensity = 0.0015;
          const delta = -e.deltaY;
          const zoom = Math.exp(delta * intensity);
    
          setTransform((prev) => {
            const nextScale = clamp(prev.scale * zoom, minScale, maxScale);
            // Зумим относительно курсора: сохраняем точку под курсором
            const worldX = (px - prev.x) / prev.scale;
            const worldY = (py - prev.y) / prev.scale;
            const nextX = px - worldX * nextScale;
            const nextY = py - worldY * nextScale;
            return { x: nextX, y: nextY, scale: nextScale };
          });
        },
        [minScale, maxScale, setTransform],
      );
    
      const onKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === "0") {
            e.preventDefault();
            setTransform(() => ({ x: initialX, y: initialY, scale: initialScale }));
          }
          if (e.key === "+" || e.key === "=") {
            e.preventDefault();
            setTransform((prev) => ({ ...prev, scale: prev.scale * 1.1 }));
          }
          if (e.key === "-" || e.key === "_") {
            e.preventDefault();
            setTransform((prev) => ({ ...prev, scale: prev.scale / 1.1 }));
          }
        },
        [initialX, initialY, initialScale, setTransform],
      );
    
      const gridStyle = useMemo(() => {
        if (grid === "none") return {};
        const base = 28;
        // чтобы линии не “сливались” при масштабировании — фиксируем шаг сетки к ближайшей степени 2
        const step = nextPow2(base * t.scale);
        const opacity = grid === "dots" ? 0.22 : 0.35;
        const bg =
          grid === "dots"
            ? `radial-gradient(circle at 1px 1px, rgba(255,255,255,${opacity}) 1px, transparent 1px)`
            : `linear-gradient(rgba(255,255,255,${opacity}) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,${opacity}) 1px, transparent 1px)`;
        return {
          backgroundImage: bg,
          backgroundSize: `${step}px ${step}px`,
          backgroundPosition: `${t.x}px ${t.y}px`,
        } as React.CSSProperties;
      }, [grid, t.scale, t.x, t.y]);

      return {
        t,
        rootRef,
        gridStyle,
        onKeyDown,
        onPointerDown,
        onPointerMove,
        onPointerUp,
        onWheel,
        onPointerCancel: onPointerUp,
      }
}