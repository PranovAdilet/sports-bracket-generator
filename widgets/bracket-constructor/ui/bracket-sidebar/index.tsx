"use client";

import {
  BRACKET_SIZES,
  MATCH_FORMATS,
  SEEDING_TYPES,
  TOURNAMENT_TYPES,
} from "@/widgets/bracket-constructor/model/options";
import { useState } from "react";
import {
  TournamentDetailsSection,
  TournamentDetailsSectionValue,
} from "./sections/tournament-details-section";
import {
  TournamentFormatSection,
  TournamentFormatSectionValue,
} from "./sections/tournament-format-section";
import {
  TournamentParticipantsSection,
  TournamentParticipantsSectionValue,
} from "./sections/tournament-participants-section";
import {
  TournamentExportSection,
  TournamentExportSectionValue,
} from "./sections/tournament-export-section";

type TournamentBracketFormData = TournamentDetailsSectionValue &
  TournamentFormatSectionValue &
  TournamentParticipantsSectionValue &
  TournamentExportSectionValue;

export const BracketSidebar = () => {
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
  });
  return (
    <aside className="border-b lg:border-b-0 lg:border-r border-border bg-panel/40 flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-auto p-4 md:p-5 space-y-4 scrollbar-custom">
        <TournamentDetailsSection
          value={{
            tournamentName: formData.tournamentName,
            game: formData.game,
            location: formData.location,
            season: formData.season,
          }}
          onChange={(patch) => setFormData((prev) => ({ ...prev, ...patch }))}
        />
        <TournamentFormatSection
          value={{
            bracketSize: formData.bracketSize,
            byeSlots: formData.byeSlots,
            matchFormat: formData.matchFormat,
            seeding: formData.seeding,
            thirdPlaceMatch: formData.thirdPlaceMatch,
            tournamentType: formData.tournamentType,
          }}
          onChange={(patch) => setFormData((prev) => ({ ...prev, ...patch }))}
        />
        <TournamentParticipantsSection
          value={{}}
          onChange={(patch) => setFormData((prev) => ({ ...prev, ...patch }))}
        />
      </div>

      <div className="border-t border-border bg-panel/60 p-4 md:p-5">
        <TournamentExportSection
          value={{}}
          onChange={(patch) => setFormData((prev) => ({ ...prev, ...patch }))}
        />
      </div>
    </aside>
  );
};
