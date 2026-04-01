import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SiteSettings } from "@/lib/types";
import { defaultSettings } from "@/lib/data";

interface SettingsState {
  data: SiteSettings;
}

const initialState: SettingsState = {
  data: defaultSettings,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateSettings(state, action: PayloadAction<Partial<SiteSettings>>) {
      state.data = { ...state.data, ...action.payload };
    },
    setSettings(state, action: PayloadAction<SiteSettings>) {
      state.data = action.payload;
    },
  },
});

export const { updateSettings, setSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
