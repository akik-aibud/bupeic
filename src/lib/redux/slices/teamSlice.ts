import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TeamMember } from "@/lib/types";
import { defaultTeamMembers } from "@/lib/data";

interface TeamState {
  members: TeamMember[];
}

const initialState: TeamState = {
  members: defaultTeamMembers,
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    addTeamMember(state, action: PayloadAction<TeamMember>) {
      state.members.push(action.payload);
    },
    updateTeamMember(
      state,
      action: PayloadAction<{ id: string; updates: Partial<TeamMember> }>
    ) {
      const idx = state.members.findIndex((m) => m.id === action.payload.id);
      if (idx !== -1) {
        state.members[idx] = {
          ...state.members[idx],
          ...action.payload.updates,
        };
      }
    },
    deleteTeamMember(state, action: PayloadAction<string>) {
      state.members = state.members.filter((m) => m.id !== action.payload);
    },
    setTeamMembers(state, action: PayloadAction<TeamMember[]>) {
      state.members = action.payload;
    },
  },
});

export const { addTeamMember, updateTeamMember, deleteTeamMember, setTeamMembers } =
  teamSlice.actions;
export default teamSlice.reducer;
