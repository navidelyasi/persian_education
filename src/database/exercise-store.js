import create from "zustand";
import { getAllExercises } from "../hooks/firebaseServices";
import { prepareExercises } from "../hooks/prepare-qs-for-answering";

export const exerciseStore = create((set) => ({
  data: [],
  index: 0,
  qindex: 0,
  dragableItems: [],
  setIndex: (i) => {
    set({ index: i, qindex: 0, dragableItems: [] });
  },
  setQIndex: (i) => {
    set({ qindex: i });
  },
  isLoading: false,
  error: null,
  getExercises: async (level, unit) => {
    try {
      set({ isLoading: true });
      let _exercises = await getAllExercises(level, unit);
      const response = prepareExercises(_exercises);
      set({ isLoading: false, data: response });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },
  setExercises: (updatedExercises) => {
    set({ data: updatedExercises });
  },
  setDragableItems: (list) => {
    set({ dragableItems: list });
  },
}));
