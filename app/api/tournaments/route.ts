// app/api/tournaments/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/shared/lib/db";
import { Tournament, TournamentCreateInput } from "@/entities/tournament";

export async function GET(req: NextRequest) {
  const tournaments = await db.tournament.findMany({
    include: {
      brackets: {
        include: {
          teams: true,
          rounds: {
            include: {
              matches: true,
            },
          },
        },
      },
    },
  });

  // Преобразуем Prisma объекты в API типы
  const result: Tournament[] = tournaments.map(t => ({
    id: t.id,
    name: t.name,
    description: t.description ?? undefined,
    logo: t.logo ?? undefined,
    startDate: t.startDate?.toISOString(),
    endDate: t.endDate?.toISOString(),
    brackets: t.brackets.map(b => ({
      id: b.id,
      tournamentId: b.tournamentId,
      teams: b.teams.map(team => ({
        id: team.id,
        name: team.name,
      })),
      rounds: b.rounds.map(round => ({
        id: round.id,
        name: round.name,
        matches: round.matches.map(m => ({
          id: m.id,
          team1: b.teams.find(t => t.id === m.team1Id) ?? null,
          team2: b.teams.find(t => t.id === m.team2Id) ?? null,
          score: { team1: m.score1, team2: m.score2 },
          winner: b.teams.find(t => t.id === m.winnerId) ?? null,
          nextMatchId: m.nextMatchId ?? undefined,
          status: m.status as "pending" | "finished",
          position: undefined,
          bestOf: 3,
        })),
      })),
    })),
  }));

  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  const data: TournamentCreateInput = await req.json();

  const tournament = await db.tournament.create({
    data: {
      name: data.name,
      description: data.description,
      logo: data.logo,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      endDate: data.endDate ? new Date(data.endDate) : undefined,
    },
  });

  return NextResponse.json({
    ...tournament,
    startDate: tournament.startDate?.toISOString(),
    endDate: tournament.endDate?.toISOString(),
    brackets: [],
  } as Tournament);
}