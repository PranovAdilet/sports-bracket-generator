import { Round, Team } from "@/entities/tournament"
import { create } from "zustand"
import { generateBracket } from "./generate-bracket"

type UseBracketTypes = {
    teams: Team[]
    rounds: Round[]
    setTeams: (teams: Team[]) => void
    setWinner: (matchId: string, teamId: string) => void
    generate: () => void
}

export const useBracketStore = create<UseBracketTypes>((set) => ({
  teams: [],
  rounds: [],
  setTeams: (teams) => set({ teams }),

  generate: () => set((state) => ({
    rounds: generateBracket(state.teams)
  })),

  setWinner: () => {
    // логика продвижения победителя
  }
}))