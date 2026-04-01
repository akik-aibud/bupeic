"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type {
  Event,
  TeamMember,
  Message,
  SiteSettings,
  Stats,
} from "./types";
import {
  defaultEvents,
  defaultTeamMembers,
  defaultMessages,
  defaultSettings,
  defaultStats,
} from "./data";

interface StoreState {
  events: Event[];
  teamMembers: TeamMember[];
  messages: Message[];
  settings: SiteSettings;
  stats: Stats;
}

interface StoreActions {
  // Events
  addEvent: (event: Event) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  // Team
  addTeamMember: (member: TeamMember) => void;
  updateTeamMember: (id: string, member: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;
  // Messages
  updateMessage: (id: string, updates: Partial<Message>) => void;
  deleteMessage: (id: string) => void;
  // Settings
  updateSettings: (settings: Partial<SiteSettings>) => void;
  // Stats
  updateStats: (stats: Partial<Stats>) => void;
}

type Store = StoreState & StoreActions;

const StoreContext = createContext<Store | null>(null);

const STORAGE_KEY = "bupeic_store";

function loadFromStorage(): StoreState | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore parse errors
  }
  return null;
}

function saveToStorage(state: StoreState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore storage errors
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>(defaultEvents);
  const [teamMembers, setTeamMembers] =
    useState<TeamMember[]>(defaultTeamMembers);
  const [messages, setMessages] = useState<Message[]>(defaultMessages);
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [stats, setStats] = useState<Stats>(defaultStats);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = loadFromStorage();
    if (stored) {
      setEvents(stored.events);
      setTeamMembers(stored.teamMembers);
      setMessages(stored.messages);
      setSettings(stored.settings);
      setStats(stored.stats);
    }
    setLoaded(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (!loaded) return;
    saveToStorage({ events, teamMembers, messages, settings, stats });
  }, [events, teamMembers, messages, settings, stats, loaded]);

  // ── Event Actions ──
  const addEvent = useCallback((event: Event) => {
    setEvents((prev) => [event, ...prev]);
  }, []);

  const updateEvent = useCallback((id: string, updates: Partial<Event>) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, ...updates, updatedAt: new Date().toISOString() } : e
      )
    );
  }, []);

  const deleteEvent = useCallback((id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }, []);

  // ── Team Actions ──
  const addTeamMember = useCallback((member: TeamMember) => {
    setTeamMembers((prev) => [...prev, member]);
  }, []);

  const updateTeamMember = useCallback(
    (id: string, updates: Partial<TeamMember>) => {
      setTeamMembers((prev) =>
        prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
      );
    },
    []
  );

  const deleteTeamMember = useCallback((id: string) => {
    setTeamMembers((prev) => prev.filter((m) => m.id !== id));
  }, []);

  // ── Message Actions ──
  const updateMessage = useCallback(
    (id: string, updates: Partial<Message>) => {
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
      );
    },
    []
  );

  const deleteMessage = useCallback((id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  }, []);

  // ── Settings Actions ──
  const updateSettingsFn = useCallback(
    (updates: Partial<SiteSettings>) => {
      setSettings((prev) => ({ ...prev, ...updates }));
    },
    []
  );

  // ── Stats Actions ──
  const updateStatsFn = useCallback((updates: Partial<Stats>) => {
    setStats((prev) => ({ ...prev, ...updates }));
  }, []);

  return (
    <StoreContext.Provider
      value={{
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
        updateMessage,
        deleteMessage,
        updateSettings: updateSettingsFn,
        updateStats: updateStatsFn,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore(): Store {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
