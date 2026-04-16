import {  Team } from "@/entities/tournament";
import { BracketSize } from "@/features/bracket-generation";

export type TournamentBracketFormData = {
  tournamentName: string;
  game: string;
  season: Date;
  location: string;

  tournamentType: string;
  bracketSize: BracketSize ;
  matchFormat: string;
  seeding: string;

  thirdPlaceMatch: boolean;
  byeSlots: boolean;

  teams: Team[]
};