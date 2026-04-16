"use client";

import { Team } from "@/entities/tournament";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/ui";

import { PlusIcon } from "lucide-react";
import { TournamentTeamCard } from "./tournament-team-card";
import { useState } from "react";
import { showError } from "@/shared/lib";

export type TournamentParticipantsSectionValue = {
  teams: Team[];
};

export type TournamentParticipantsSectionProps = {
  value: TournamentParticipantsSectionValue;
  onChange: (patch: Partial<TournamentParticipantsSectionValue>) => void;
};

export const TournamentParticipantsSection = ({
  value,
  onChange,
}: TournamentParticipantsSectionProps) => {
  const [textareaValue, setTextareaValue] = useState<string | null>(null);

  const computedValue =
    textareaValue ?? value.teams.map((t) => t.name).join("\n");

  const handleUpdateTeams = (newTeam: Team, isNewTeam?: boolean) => {
    let updatedTeams: Team[] = [];
    if (isNewTeam) {
      updatedTeams = [...value.teams, newTeam];
    } else {
      updatedTeams = value.teams.map((team) =>
        team.id === newTeam.id ? newTeam : team,
      );
    }
    onChange({ teams: updatedTeams });
  };

  const handleRemoveTeam = (teamId: string) => {
    const updatedTeams: Team[] = value.teams.filter((t) => t.id !== teamId);
    onChange({ teams: updatedTeams });
  };

  const handlePasteList = (text: string) => {
    let isError = false;
    const teams: Team[] = text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((name) => {
        if (name.length < 3 || name.length > 20) {
          isError = true;
        }
        return {
          id: crypto.randomUUID(),
          name,
        };
      });
    if (isError) {
      showError("Названия команд должны быть от 3 до 20 символов");
      return;
    }

    onChange({ teams });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <span>Участники</span>
          <Badge>{value.teams.length} / 8</Badge>
        </CardTitle>
        <CardDescription>
          Можно вводить вручную или вставить списком.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="manual_entry">
          <TabsList>
            <TabsTrigger value="manual_entry">Ручной ввод</TabsTrigger>
            <TabsTrigger value="insert_list">Вставка списком</TabsTrigger>
          </TabsList>

          <TabsContent value="manual_entry">
            <div className="space-y-2">
              {value.teams.map((team, index) => (
                <TournamentTeamCard
                  key={team.id}
                  index={index}
                  team={team}
                  onChange={handleUpdateTeams}
                  onRemove={handleRemoveTeam}
                />
              ))}
              <TournamentTeamCard
                key={value.teams.length}
                index={value.teams.length}
                onChange={handleUpdateTeams}
                onRemove={handleRemoveTeam}
              />
              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={() => {
                  handleUpdateTeams(
                    { id: crypto.randomUUID(), name: "" },
                    true,
                  );
                }}
              >
                <PlusIcon className="h-4 w-4" />
                Добавить команду
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="insert_list">
            <div className="space-y-2">
              <div className="text-[12px] font-medium text-white/85">
                Вставить списком (по одной на строку)
              </div>
              <textarea
                className="min-h-[92px] w-full resize-y rounded-xl bg-white/5 px-3 py-2 text-[13px] text-white/90 ring-1 ring-border outline-none placeholder:text-muted-2 focus:ring-2 focus:ring-accent/60"
                placeholder={"Team A\nTeam B\nTeam C"}
                value={computedValue}
                onFocus={() => {
                  setTextareaValue(value.teams.map((t) => t.name).join("\n"));
                }}
                onChange={(e) => setTextareaValue(e.target.value)}
                onBlur={() => {
                  if (textareaValue !== null) {
                    handlePasteList(textareaValue);
                    setTextareaValue(null);
                  }
                }}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
