import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Message } from "@/lib/types";
import { defaultMessages } from "@/lib/data";

interface MessagesState {
  items: Message[];
}

const initialState: MessagesState = {
  items: defaultMessages,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<Message>) {
      state.items.unshift(action.payload);
    },
    updateMessage(
      state,
      action: PayloadAction<{ id: string; updates: Partial<Message> }>
    ) {
      const idx = state.items.findIndex((m) => m.id === action.payload.id);
      if (idx !== -1) {
        state.items[idx] = {
          ...state.items[idx],
          ...action.payload.updates,
        };
      }
    },
    deleteMessage(state, action: PayloadAction<string>) {
      state.items = state.items.filter((m) => m.id !== action.payload);
    },
    setMessages(state, action: PayloadAction<Message[]>) {
      state.items = action.payload;
    },
  },
});

export const { addMessage, updateMessage, deleteMessage, setMessages } =
  messagesSlice.actions;
export default messagesSlice.reducer;
