"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui";

import { Download } from "lucide-react";

export type TournamentExportSectionValue = {};

export type TournamentExportSectionProps = {
  value: TournamentExportSectionValue;
  onChange: (patch: Partial<TournamentExportSectionValue>) => void;
};

export const TournamentExportSection = ({
  value,
  onChange,
}: TournamentExportSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-4 w-4 text-white/85" />
          Экспорт
        </CardTitle>
        <CardDescription>Скачивание сетки/данных</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        <Button variant="secondary" size="sm">
          JSON
        </Button>
        <Button variant="secondary" size="sm">
          PNG
        </Button>
      </CardContent>
    </Card>
  );
};
