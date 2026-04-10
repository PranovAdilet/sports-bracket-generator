import {  Team } from "@/entities/tournament";

export type TournamentBracketFormData = {
  tournamentName: string;
  game: string;
  season: Date;
  location: string;

  tournamentType: string;
  bracketSize: string;
  matchFormat: string;
  seeding: string;

  thirdPlaceMatch: boolean;
  byeSlots: boolean;

  teams: Team[]
};