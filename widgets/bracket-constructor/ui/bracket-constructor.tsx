"use client";

import { BracketCanvas } from "./bracket-canvas";
import { BracketSidebar } from "./bracket-sidebar";

export function BracketConstructor() {
  return (
    <div className="h-[calc(100vh-65px)]">
      <div className="h-full grid grid-cols-1 lg:grid-cols-[360px_1fr]">
        <BracketSidebar />
        <BracketCanvas />
      </div>
    </div>
  );
}
