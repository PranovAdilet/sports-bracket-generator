
export type Participant = {
    id: string;
    name: string;
    age: number;
    image: string;
  };

  export type Team = {
    id: string;
    name: string;
    description?: string;
    logo?: string;
    rank?: number;
    participants?: Participant[];
  };

  export type Bracket = {
    id: string;
    tournamentId: string;
    teams: Team[];
    rounds: Round[];
  };
  
export type Match = {
    id: string;
  
    team1: Team | null;
    team2: Team | null;
  
    score: {
      team1: number;
      team2: number;
    };
  
    winner: Team | null;
  
    nextMatchId?: string;
    status: "pending" | "finished";
    position?: 1 | 2;   // для линий в UI
    bestOf: 3 | 5;
  };

export type Round = {
    id: string
    name: string
    matches: Match[]
}