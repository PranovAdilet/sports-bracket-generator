export type MatchSeed = {
    id: string;
    round: number;
    indexInRound: number;
    nextMatchId?: string;
  };

export type BracketSize = 4 | 8 | 16 | 32 | 64;