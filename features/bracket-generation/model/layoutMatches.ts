import { Match } from "@/entities/tournament";
import { MatchSeed } from "./types";

export const layoutMatches = (seeds: MatchSeed[]): Match[] => {
  const firstRoundGapY = 190;
  const firstRoundY = 40;
  const firstRoundX = 360;
  const roundSpacingX = 400;

  return seeds.map((seed) => {
    const gapForRound = firstRoundGapY * Math.pow(2, seed.round);
    const roundOffsetY = (gapForRound - firstRoundGapY) / 2;

    return {
      id: seed.id,
      team1: null,
      team2: null,
      winner: null,
      score: { team1: 0, team2: 0 },
      status: "pending",
      bestOf: 3,
      nextMatchId: seed.nextMatchId,
      position: {
        x: firstRoundX + seed.round * roundSpacingX,
        y: firstRoundY + seed.indexInRound * gapForRound + roundOffsetY,
      },
    };
  });
};
