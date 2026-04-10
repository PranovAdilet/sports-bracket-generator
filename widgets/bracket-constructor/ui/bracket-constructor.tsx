"use client";

import { useState } from "react";
import { BracketCanvas } from "./canvas";
import { BracketSidebar } from "./sidebar";

import {
  BRACKET_SIZES,
  MATCH_FORMATS,
  SEEDING_TYPES,
  TOURNAMENT_TYPES,
} from "../model/options";
import { TournamentBracketFormData } from "../model/types";

export function BracketConstructor() {
  const [formData, setFormData] = useState<TournamentBracketFormData>({
    tournamentName: "",
    game: "",
    season: new Date(),
    location: "",
    tournamentType: TOURNAMENT_TYPES[0].value,
    bracketSize: BRACKET_SIZES[0].value,
    matchFormat: MATCH_FORMATS[0].value,
    seeding: SEEDING_TYPES[0].value,
    thirdPlaceMatch: false,
    byeSlots: true,
    teams: [],
  });

  return (
    <div className="h-[calc(100vh-65px)]">
      <div className="h-full grid grid-cols-1 lg:grid-cols-[360px_1fr]">
        <BracketSidebar formData={formData} setFormData={setFormData} />
        <BracketCanvas formData={formData} />
      </div>
    </div>
  );
}
