import { create } from 'zustand'

type State = {
    selectedMatchId: string | null;
    setSelectedMatchId: (id: string | null) => void;
  };

export const useModalStore = create<State>((set) => ({
  selectedMatchId: null,
  setSelectedMatchId: (id) => set({selectedMatchId: id}),
}))

