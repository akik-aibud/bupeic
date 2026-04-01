"use client";

import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import {
  addEvent as addEventAction,
  updateEvent as updateEventAction,
  deleteEvent as deleteEventAction,
} from "./redux/slices/eventsSlice";
import {
  addTeamMember as addTeamMemberAction,
  updateTeamMember as updateTeamMemberAction,
  deleteTeamMember as deleteTeamMemberAction,
} from "./redux/slices/teamSlice";
import {
  addMessage as addMessageAction,
  updateMessage as updateMessageAction,
  deleteMessage as deleteMessageAction,
} from "./redux/slices/messagesSlice";
import { updateSettings as updateSettingsAction } from "./redux/slices/settingsSlice";
import { updateStats as updateStatsAction } from "./redux/slices/statsSlice";

import type {
  Event,
  TeamMember,
  Message,
  SiteSettings,
  Stats,
} from "./types";

interface StoreHook {
  // Data
  events: Event[];
  teamMembers: TeamMember[];
  messages: Message[];
  settings: SiteSettings;
  stats: Stats;
  // Event actions
  addEvent: (event: Event) => void;
  updateEvent: (id: string, updates: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  // Team actions
  addTeamMember: (member: TeamMember) => void;
  updateTeamMember: (id: string, updates: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;
  // Message actions
  addMessage: (message: Message) => void;
  updateMessage: (id: string, updates: Partial<Message>) => void;
  deleteMessage: (id: string) => void;
  // Settings actions
  updateSettings: (updates: Partial<SiteSettings>) => void;
  // Stats actions
  updateStats: (updates: Partial<Stats>) => void;
}

export function useStore(): StoreHook {
  const dispatch = useAppDispatch();

  const events = useAppSelector((state) => state.events.items);
  const teamMembers = useAppSelector((state) => state.team.members);
  const messages = useAppSelector((state) => state.messages.items);
  const settings = useAppSelector((state) => state.settings.data);
  const stats = useAppSelector((state) => state.stats.data);

  // Event actions
  const addEvent = useCallback(
    (event: Event) => dispatch(addEventAction(event)),
    [dispatch]
  );
  const updateEvent = useCallback(
    (id: string, updates: Partial<Event>) =>
      dispatch(updateEventAction({ id, updates })),
    [dispatch]
  );
  const deleteEvent = useCallback(
    (id: string) => dispatch(deleteEventAction(id)),
    [dispatch]
  );

  // Team actions
  const addTeamMember = useCallback(
    (member: TeamMember) => dispatch(addTeamMemberAction(member)),
    [dispatch]
  );
  const updateTeamMember = useCallback(
    (id: string, updates: Partial<TeamMember>) =>
      dispatch(updateTeamMemberAction({ id, updates })),
    [dispatch]
  );
  const deleteTeamMember = useCallback(
    (id: string) => dispatch(deleteTeamMemberAction(id)),
    [dispatch]
  );

  // Message actions
  const addMessage = useCallback(
    (message: Message) => dispatch(addMessageAction(message)),
    [dispatch]
  );
  const updateMessage = useCallback(
    (id: string, updates: Partial<Message>) =>
      dispatch(updateMessageAction({ id, updates })),
    [dispatch]
  );
  const deleteMessage = useCallback(
    (id: string) => dispatch(deleteMessageAction(id)),
    [dispatch]
  );

  // Settings actions
  const updateSettings = useCallback(
    (updates: Partial<SiteSettings>) =>
      dispatch(updateSettingsAction(updates)),
    [dispatch]
  );

  // Stats actions
  const updateStats = useCallback(
    (updates: Partial<Stats>) => dispatch(updateStatsAction(updates)),
    [dispatch]
  );

  return {
    events,
    teamMembers,
    messages,
    settings,
    stats,
    addEvent,
    updateEvent,
    deleteEvent,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    addMessage,
    updateMessage,
    deleteMessage,
    updateSettings,
    updateStats,
  };
}

// Keep StoreProvider as a no-op wrapper for backward compat in layout.tsx
export function StoreProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
