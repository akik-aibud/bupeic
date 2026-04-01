import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Event } from "@/lib/types";
import { defaultEvents } from "@/lib/data";

interface EventsState {
  items: Event[];
}

const initialState: EventsState = {
  items: defaultEvents,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent(state, action: PayloadAction<Event>) {
      state.items.unshift(action.payload);
    },
    updateEvent(
      state,
      action: PayloadAction<{ id: string; updates: Partial<Event> }>
    ) {
      const idx = state.items.findIndex((e) => e.id === action.payload.id);
      if (idx !== -1) {
        state.items[idx] = {
          ...state.items[idx],
          ...action.payload.updates,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    deleteEvent(state, action: PayloadAction<string>) {
      state.items = state.items.filter((e) => e.id !== action.payload);
    },
    setEvents(state, action: PayloadAction<Event[]>) {
      state.items = action.payload;
    },
  },
});

export const { addEvent, updateEvent, deleteEvent, setEvents } =
  eventsSlice.actions;
export default eventsSlice.reducer;
