import { TournamentCreateInput } from "@/entities/tournament";

// shared/api/tournaments.ts
export class tournamentService {

    async getTournament () {
        const data = await fetch("/api/tournaments");
        return data.json()
     }

    async createTournament (data: TournamentCreateInput) {
        const response =  fetch("/api/tournaments", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        })

        return response
    }
}