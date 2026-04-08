"use client";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/ui";

import { PlusIcon, Trash2 } from "lucide-react";

export type TournamentParticipantsSectionValue = {};

export type TournamentParticipantsSectionProps = {
  value: TournamentParticipantsSectionValue;
  onChange: (patch: Partial<TournamentParticipantsSectionValue>) => void;
};

export const TournamentParticipantsSection = ({
  value,
  onChange,
}: TournamentParticipantsSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <span>Участники</span>
          <Badge>готово под логику</Badge>
        </CardTitle>
        <CardDescription>
          Можно вводить вручную или вставить списком.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue={"manual_entry"}>
          <TabsList>
            <TabsTrigger value="manual_entry">Ручной ввод</TabsTrigger>
            <TabsTrigger value="insert_list">Вставка списком</TabsTrigger>
          </TabsList>

          <TabsContent value="manual_entry">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="text-[12px] font-medium text-white/85">
                  Команды
                </div>
                <Badge>0 / 8</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Input placeholder="Команда 1" />
                  <Button variant="ghost" size="icon" aria-label="Удалить">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Input placeholder="Команда 2" />
                  <Button variant="ghost" size="icon" aria-label="Удалить">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Input placeholder="Команда 3" />
                  <Button variant="ghost" size="icon" aria-label="Удалить">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Input placeholder="Команда 4" />
                  <Button variant="ghost" size="icon" aria-label="Удалить">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="w-full">
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
              />
              <div className="grid grid-cols-2 gap-2">
                <Button variant="secondary" size="sm" className="w-full">
                  Применить
                </Button>
                <Button variant="ghost" size="sm" className="w-full">
                  Очистить
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
