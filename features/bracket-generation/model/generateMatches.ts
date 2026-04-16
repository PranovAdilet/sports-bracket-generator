import { Match, Team } from "@/entities/tournament";
import { layoutMatches } from "./layoutMatches";
import { assignTeamsToFirstRound } from "./assignTeams";
import { BracketSize, MatchSeed } from "./types";

export const generateMatches = (bracketSize: BracketSize, teams: Team[]): Match[] => {
    const seeds = createMatchSeeds(bracketSize);
    const positionedMatches = layoutMatches(seeds);
    return assignTeamsToFirstRound(positionedMatches, teams);
  };


const createMatchSeeds = (bracketSize: BracketSize): MatchSeed[] => {
    const roundCount = Math.log2(bracketSize);
    const rounds: MatchSeed[][] = [];
    let firstRoundCounter = 1;
  
    for (let round = 0; round < roundCount; round++) {
      const matchesInRound = bracketSize / Math.pow(2, round + 1);
      const currentRound: MatchSeed[] = [];
  
      for (let indexInRound = 0; indexInRound < matchesInRound; indexInRound++) {
        currentRound.push({
          id:
            round === 0
              ? `m${firstRoundCounter++}`
              : `r${round + 1}_${indexInRound + 1}`,
          round,
          indexInRound,
        });
      }
  
      rounds.push(currentRound);
    }
  
    for (let round = 0; round < rounds.length - 1; round++) {
      const currentRound = rounds[round];
      const nextRound = rounds[round + 1];
  
      currentRound.forEach((match, index) => {
        match.nextMatchId = nextRound[Math.floor(index / 2)]?.id;
      });
    }
  
    return rounds.flat();
  };