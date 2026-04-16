import { Match, Team } from "@/entities/tournament";

export 
const assignTeamsToFirstRound = (matches: Match[], teams: Team[]): Match[] => {
  const nextMatchMap = new Set(matches.map((match) => match.nextMatchId).filter(Boolean));
  const firstRoundMatchIds = matches
    .filter((match) => !nextMatchMap.has(match.id))
    .map((match) => match.id);

  const teamsByMatchId = new Map<
    string,
    { team1: Team | null; team2: Team | null }
  >();

  firstRoundMatchIds.forEach((matchId, index) => {
    teamsByMatchId.set(matchId, {
      team1: teams[index * 2] ?? null,
      team2: teams[index * 2 + 1] ?? null,
    });
  });

  return matches.map((match) => {
    const seededTeams = teamsByMatchId.get(match.id);
    if (!seededTeams) return match;

    return {
      ...match,
      team1: seededTeams.team1,
      team2: seededTeams.team2,
    };
  });
};

