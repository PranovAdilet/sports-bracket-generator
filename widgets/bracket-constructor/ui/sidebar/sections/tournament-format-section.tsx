"use client";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Select,
} from "@/shared/ui";
import {
  BRACKET_SIZES,
  MATCH_FORMATS,
  SEEDING_TYPES,
  TOURNAMENT_TYPES,
} from "@/widgets/bracket-constructor/model/options";
import { Shuffle } from "lucide-react";

export type TournamentFormatSectionValue = {
  tournamentType: string;
  bracketSize: string;
  matchFormat: string;
  seeding: string;
  thirdPlaceMatch: boolean;
  byeSlots: boolean;
};

export type TournamentFormatSectionProps = {
  value: TournamentFormatSectionValue;
  onChange: (patch: Partial<TournamentFormatSectionValue>) => void;
};

export const TournamentFormatSection = ({
  value,
  onChange,
}: TournamentFormatSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">Формат</CardTitle>
        <CardDescription>Параметры генерации сетки.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="text-[12px] font-medium text-white/85">
            Тип турнира
          </div>
          <Select
            options={TOURNAMENT_TYPES}
            value={value.tournamentType}
            onChange={(value) => {
              onChange({
                tournamentType: value,
              });
            }}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <div className="text-[12px] font-medium text-white/85">
              Размер сетки
            </div>

            <Select
              options={BRACKET_SIZES}
              value={value.bracketSize}
              onChange={(value) => {
                onChange({
                  bracketSize: value,
                });
              }}
            />
          </div>
          <div className="space-y-2">
            <div className="text-[12px] font-medium text-white/85">Матч</div>
            <Select
              options={MATCH_FORMATS}
              value={value.matchFormat}
              onChange={(value) => {
                onChange({
                  matchFormat: value,
                });
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <div className="text-[12px] font-medium text-white/85">Посев</div>
            <Select
              options={SEEDING_TYPES}
              value={value.seeding}
              onChange={(value) => {
                onChange({
                  seeding: value,
                });
              }}
            />
          </div>
          <div className="space-y-2">
            <div className="text-[12px] font-medium text-white/85">
              Действия
            </div>
            <Button variant="secondary" size="sm" className="w-full">
              <Shuffle className="h-4 w-4" />
              Перемешать
            </Button>
          </div>
        </div>

        <label className="flex items-center justify-between gap-3 rounded-xl bg-white/3 px-3 py-2 ring-1 ring-border">
          <div className="space-y-0.5">
            <div className="text-[12px] font-medium text-white/85">
              Матч за 3-е место
            </div>
            <div className="text-[12px] text-muted-2">
              Добавить дополнительный матч в конце.
            </div>
          </div>
          <Input
            type="checkbox"
            className="h-4 w-4 accent-border"
            checked={value.thirdPlaceMatch}
            onChange={(e) => {
              onChange({
                thirdPlaceMatch: e.target.checked,
              });
            }}
          />
        </label>

        <label className="flex items-center justify-between gap-3 rounded-xl bg-white/3 px-3 py-2 ring-1 ring-border">
          <div className="space-y-0.5">
            <div className="text-[12px] font-medium text-white/85">
              BYE-слоты
            </div>
            <div className="text-[12px] text-muted-2">
              Автоматически заполнять пустые места.
            </div>
          </div>
          <Input
            type="checkbox"
            className="h-4 w-4 accent-border"
            checked={value.byeSlots}
            onChange={(e) => {
              onChange({
                byeSlots: e.target.checked,
              });
            }}
          />
        </label>
      </CardContent>
    </Card>
  );
};
