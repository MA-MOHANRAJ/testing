// src/lib/storage.ts
export interface Milestone {
  title: string;
  duration_days: number;
  tasks: string[];
  resources: string[];
}

export interface StoredRoadmap {
  id: string;
  topic: string;
  level: string;
  quiz_responses: Record<string, string>;
  milestones: Milestone[];
  created_at: string;
}

export interface StoredSchedule {
  roadmap_id: string;
  day: number;
  tasks: { title: string; completed: boolean }[];
  id?: string;
}

/* ---------- helpers ---------- */
const ROADMAPS_KEY = "roadmaps";
const SCHEDULES_KEY = "schedules";

function get<T>(key: string): T[] {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : [];
}
function set<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

/* ---------- API ---------- */
export const storage = {
  // users are not needed for localStorage – we just use a dummy id
  async getUserId() {
    return "local-user";
  },

  async upsertRoadmap(roadmap: Omit<StoredRoadmap, "id" | "created_at">) {
    const list = get<StoredRoadmap>(ROADMAPS_KEY);
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const newItem: StoredRoadmap = { ...roadmap, id, created_at: now };
    list.push(newItem);
    set(ROADMAPS_KEY, list);
    return newItem;
  },

  async getRoadmaps(): Promise<StoredRoadmap[]> {
    return get<StoredRoadmap>(ROADMAPS_KEY);
  },

  async getRoadmap(id: string): Promise<StoredRoadmap | null> {
    const list = get<StoredRoadmap>(ROADMAPS_KEY);
    return list.find((r) => r.id === id) ?? null;
  },

  async getSchedules(roadmap_id: string): Promise<StoredSchedule[]> {
    const all = get<StoredSchedule>(SCHEDULES_KEY);
    return all.filter((s) => s.roadmap_id === roadmap_id);
  },

  async upsertSchedules(schedules: StoredSchedule[]) {
    const all = get<StoredSchedule>(SCHEDULES_KEY);
    const existing = all.filter((s) => !schedules.some((ns) => ns.id === s.id));
    const merged = [...existing, ...schedules.map((s) => ({ ...s, id: s.id ?? crypto.randomUUID() }))];
    set(SCHEDULES_KEY, merged);
  },

  async updateSchedule(id: string, tasks: { title: string; completed: boolean }[]) {
    const all = get<StoredSchedule>(SCHEDULES_KEY);
    const idx = all.findIndex((s) => s.id === id);
    if (idx === -1) return;
    all[idx].tasks = tasks;
    set(SCHEDULES_KEY, all);
  },
};