import { Option } from "@/shared/ui";

  /**
   * Тип турнира
   */
  export const TOURNAMENT_TYPES: Option[] = [
    { label: "Single Elimination", value: "single" },
    { label: "Double Elimination", value: "double" },
    { label: "Round Robin", value: "round" },
  ];
  
  /**
   * Размер сетки
   */
  export const BRACKET_SIZES: Option[] = [
    { label: "4", value: "4" },
    { label: "8", value: "8" },
    { label: "16", value: "16" },
    { label: "32", value: "32" },
  ];
  
  /**
   * Формат матчей
   */
  export const MATCH_FORMATS: Option[] = [
    { label: "Bo1", value: "bo1" },
    { label: "Bo3", value: "bo3" },
    { label: "Bo5", value: "bo5" },
  ];
  
  /**
   * Тип посева
   */
  export const SEEDING_TYPES: Option[] = [
    { label: "По списку", value: "as_entered" },
    { label: "Случайный", value: "random" },
  ];
  
  /**
   * Tabs (участники)
   */
  export const TEAM_INPUT_TABS: Option[] = [
    { label: "Ручной ввод", value: "manual_entry" },
    { label: "Вставка списком", value: "insert_list" },
  ];
  
  /**
   * Экспорт
   */
  export const EXPORT_FORMATS: Option[] = [
    { label: "JSON", value: "json" },
    { label: "PNG", value: "png" },
  ];