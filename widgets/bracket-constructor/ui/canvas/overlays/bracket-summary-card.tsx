"use client";

import { TournamentBracketFormData } from "@/widgets/bracket-constructor/model/types";

function formatSeason(season: TournamentBracketFormData["season"]) {
  if (!season) return "—";
  const d =
    season instanceof Date ? season : new Date(season as unknown as string);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

type Props = {
  formData: TournamentBracketFormData;
};

export const BracketSummaryCard = ({ formData }: Props) => {
  return (
    <div
      className="absolute left-0 top-[40px] w-[340px]"
      data-canvas-interactive
    >
      <div className="rounded-2xl bg-panel/75 ring-1 ring-border shadow-[0_16px_50px_rgba(0,0,0,0.40)] backdrop-blur">
        <div className="p-3 pb-2 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate text-[12px] font-semibold text-white/95">
              {formData.tournamentName || "Название турнира"}
            </div>
            <div className="text-[11px] text-muted-2">
              Live preview (поля из сайдбара)
            </div>
          </div>
          <div className="shrink-0 rounded-xl bg-white/5 px-2 py-1 text-[11px] text-white/85 ring-1 ring-border">
            {formData.tournamentType || "—"}
          </div>
        </div>

        <div className="px-3 pb-3 space-y-3">
          <div className="rounded-xl bg-white/4 ring-1 ring-border px-3 py-2 space-y-2">
            <div className="text-[11px] font-semibold text-white/90">
              Турнир
            </div>
            <PreviewRow label="Игра" value={formData.game} />
            <PreviewRow
              label="Сезон / дата"
              value={formatSeason(formData.season)}
            />
            <PreviewRow label="Локация" value={formData.location} />
          </div>

          <div className="rounded-xl bg-white/4 ring-1 ring-border px-3 py-2 space-y-2">
            <div className="text-[11px] font-semibold text-white/90">
              Формат
            </div>
            <PreviewRow label="Размер сетки" value={formData.bracketSize} />
            <PreviewRow label="Матч" value={formData.matchFormat} />
            <PreviewRow label="Посев" value={formData.seeding} />
          </div>

          <div className="rounded-xl bg-white/4 ring-1 ring-border px-3 py-2 space-y-2">
            <div className="text-[11px] font-semibold text-white/90">Опции</div>
            <PreviewRow
              label="Матч за 3-е место"
              value={formData.thirdPlaceMatch}
            />
            <PreviewRow label="BYE-слоты" value={formData.byeSlots} />
          </div>
        </div>
      </div>
    </div>
  );
};

function PreviewRow({
  label,
  value,
}: {
  label: string;
  value: string | number | boolean | null | undefined;
}) {
  const text =
    value === null || value === undefined || value === ""
      ? "—"
      : typeof value === "boolean"
        ? value
          ? "Да"
          : "Нет"
        : String(value);

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="text-[11px] text-muted-2">{label}</div>
      <div className="min-w-0 truncate text-[12px] font-medium text-white/90">
        {text}
      </div>
    </div>
  );
}
