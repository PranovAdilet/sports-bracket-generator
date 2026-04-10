import { Card, CardContent, CardDescription, CardHeader, CardTitle, Input } from "@/shared/ui";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export type TournamentDetailsSectionValue = {
  tournamentName: string;
  game: string;
  season: Date;
  location: string;
};

export type TournamentDetailsSectionProps = {
  value: TournamentDetailsSectionValue;
  onChange: (patch: Partial<TournamentDetailsSectionValue>) => void;
};

export const TournamentDetailsSection = ({
  value,
  onChange,
}: TournamentDetailsSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">Турнир</CardTitle>
        <CardDescription>Основные сведения о турнире.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="text-[12px] font-medium text-white/85">
            Название турнира
          </div>
          <Input
            placeholder="Напр. Spring Cup 2026"
            value={value.tournamentName}
            onChange={(e) => onChange({ tournamentName: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <div className="text-[12px] font-medium text-white/85">
              Игра / дисциплина
            </div>
            <Input
              placeholder="Напр. CS2"
              value={value.game}
              onChange={(e) => onChange({ game: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <div className="text-[12px] font-medium text-white/85">
              Сезон / дата
            </div>
            <DatePicker
              selected={value.season}
              onSelect={(date) => {
                if (!date) return;
                onChange({ season: date });
              }}
              className="h-10 w-full rounded-xl bg-white/5 px-3 text-[13px] text-white/90 ring-1 ring-border outline-none placeholder:text-muted-2"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-[12px] font-medium text-white/85">
            Локация (опционально)
          </div>
          <Input
            value={value.location}
            onChange={(e) => onChange({ location: e.target.value })}
            placeholder="Онлайн / Москва / LAN"
          />
        </div>
      </CardContent>
    </Card>
  );
};

