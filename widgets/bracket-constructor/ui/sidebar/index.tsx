"use client";

import { Dispatch, SetStateAction } from "react";
import { TournamentDetailsSection } from "./sections/tournament-details-section";
import { TournamentFormatSection } from "./sections/tournament-format-section";
import { TournamentParticipantsSection } from "./sections/tournament-participants-section";
import { TournamentExportSection } from "./sections/tournament-export-section";
import { TournamentBracketFormData } from "../../model/types";

type Props = {
  formData: TournamentBracketFormData;
  setFormData: Dispatch<SetStateAction<TournamentBracketFormData>>;
};

export const BracketSidebar = ({ formData, setFormData }: Props) => {
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
          value={{
            teams: formData.teams,
          }}
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
