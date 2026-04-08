import type { Bracket } from "./types"

export type Tournament = {
    id: string
    name: string
    description?: string
    logo?: string
    startDate?: string; // ISO string
    endDate?: string;   // ISO string
    brackets: Bracket[]
}

export type TournamentCreateInput = Omit<Tournament, "id" | "brackets" >
