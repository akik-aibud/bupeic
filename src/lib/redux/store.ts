import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import eventsReducer from "./slices/eventsSlice";
import teamReducer from "./slices/teamSlice";
import messagesReducer from "./slices/messagesSlice";
import settingsReducer from "./slices/settingsSlice";
import statsReducer from "./slices/statsSlice";
import authReducer from "./slices/authSlice";

const rootReducer = combineReducers({
  events: eventsReducer,
  team: teamReducer,
  messages: messagesReducer,
  settings: settingsReducer,
  stats: statsReducer,
  auth: authReducer,
});

const persistConfig = {
  key: "bupeic",
  storage,
  whitelist: ["events", "team", "messages", "settings", "stats", "auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

  const persistor = persistStore(store);

  return { store, persistor };
};

// Type exports
export type AppStore = ReturnType<typeof makeStore>["store"];
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
