"use client";

import { Team } from "@/entities/tournament";
import { showError } from "@/shared/lib";
import { Button, Input } from "@/shared/ui";
import { Trash2 } from "lucide-react";
import { ChangeEvent, useState } from "react";

type Props = {
  team?: Team;
  index: number;
  onChange: (updatedTeam: Team, isNewTeam?: boolean) => void;
  onRemove: (id: string) => void;
};

export const TournamentTeamCard = ({
  team,
  index,
  onChange,
  onRemove,
}: Props) => {
  const [name, setName] = useState(team?.name ?? "");

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleTeamUpdate = () => {
    if (name.length < 3 || name.length > 20) {
      showError("Название команды должно быть от 3 до 20 символов");
      return;
    }
    const updatedTeam: Team = {
      id: team?.id ?? crypto.randomUUID(),
      name: name.trim(),
      ...team,
    };
    onChange(updatedTeam, !team?.id);
  };
  return (
    <div key={index} className="flex items-center gap-2">
      <Input
        placeholder={`Команда ${index + 1}`}
        value={name}
        onChange={handleNameChange}
        onBlur={handleTeamUpdate}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleTeamUpdate();
          }
        }}
      />
      <Button
        variant="ghost"
        size="icon"
        aria-label="Удалить"
        onClick={() => onRemove(team!.id)}
        disabled={!team}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
