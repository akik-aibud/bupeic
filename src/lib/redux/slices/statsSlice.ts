import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Stats } from "@/lib/types";
import { defaultStats } from "@/lib/data";

interface StatsState {
  data: Stats;
}

const initialState: StatsState = {
  data: defaultStats,
};

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    updateStats(state, action: PayloadAction<Partial<Stats>>) {
      state.data = { ...state.data, ...action.payload };
    },
    setStats(state, action: PayloadAction<Stats>) {
      state.data = action.payload;
    },
  },
});

export const { updateStats, setStats } = statsSlice.actions;
export default statsSlice.reducer;
