export interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  lead?: string;
  demoUrl?: string;
  docsUrl?: string;
  lastUpdated: string;
  status: "active" | "beta" | "deprecated";
  icon: string;
  deleted_at?: string | null;
  archived_at?: string | null;
}

export const defaultProjects: Project[] = [
  {
    id: "agilelab-hq",
    name: "AgileLab HQ",
    description:
      "Custom agency business website and digital platform engineered to showcase software services, enterprise case studies, and drive corporate client inquiries.",
    category: "Business Website",
    lead: "Aivora Labs",
    demoUrl: "https://www.agilelabhq.com",
    docsUrl: "https://www.agilelabhq.com",
    lastUpdated: "2026-04-16",
    status: "active",
    icon: "Briefcase",
  },
  {
    id: "rea-desynz",
    name: "Rea Desynz",
    description:
      "Luxury creative studio website and landing page featuring editorial typography and bespoke layouts to establish authority and convert high-ticket design clients.",
    category: "Landing Page",
    lead: "Aivora Labs",
    demoUrl: "https://rea-desynz.vercel.app",
    docsUrl: "https://rea-desynz.vercel.app",
    lastUpdated: "2026-04-18",
    status: "active",
    icon: "LayoutGrid",
  },
];

const STORAGE_KEY = "aivora_labs_showcase_projects_v3";

export function loadAllProjects(): Project[] {
  if (typeof window === "undefined") return defaultProjects;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProjects));
      return defaultProjects;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      let changed = false;
      if (
        !parsed.some(
          (p: Project) =>
            p.id === "rea-desynz" || p.demoUrl?.includes("rea-desynz"),
        )
      ) {
        parsed.splice(1, 0, defaultProjects[1]);
        changed = true;
      }
      if (
        !parsed.some(
          (p: Project) =>
            p.id === "agilelab-hq" || p.demoUrl?.includes("agilelabhq"),
        )
      ) {
        parsed.unshift(defaultProjects[0]);
        changed = true;
      }
      if (changed) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      }
    }
    return parsed;
  } catch (e) {
    console.error("Failed to load projects from localStorage:", e);
    return defaultProjects;
  }
}

export function saveAllProjects(projects: Project[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (e) {
    console.error("Failed to save projects to localStorage:", e);
  }
}

export function getProjectById(id: string): Project | undefined {
  const all = loadAllProjects();
  return all.find((p) => p.id === id);
}

export function upsertProject(
  project: Partial<Project> & { id?: string; name: string },
): Project {
  const all = loadAllProjects();
  const now = new Date().toISOString().split("T")[0];

  if (project.id) {
    const index = all.findIndex((p) => p.id === project.id);
    if (index >= 0) {
      const updated: Project = {
        ...all[index],
        ...project,
        lastUpdated: now,
      } as Project;
      all[index] = updated;
      saveAllProjects(all);
      return updated;
    }
  }

  const newProject: Project = {
    id:
      project.id ||
      `proj-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: project.name,
    description: project.description || "",
    category: project.category || "General",
    lead: project.lead || "Aivora Labs",
    demoUrl: project.demoUrl || "",
    docsUrl: project.docsUrl || "",
    lastUpdated: now,
    status: project.status || "active",
    icon: project.icon || "Briefcase",
    deleted_at: null,
    archived_at: null,
  };

  all.unshift(newProject);
  saveAllProjects(all);
  return newProject;
}

export function softDeleteProject(id: string): void {
  const all = loadAllProjects();
  const updated = all.map((p) =>
    p.id === id ? { ...p, deleted_at: new Date().toISOString() } : p,
  );
  saveAllProjects(updated);
}

export function restoreProject(id: string): void {
  const all = loadAllProjects();
  const updated = all.map((p) =>
    p.id === id ? { ...p, deleted_at: null } : p,
  );
  saveAllProjects(updated);
}

export function permanentDeleteProject(id: string): void {
  const all = loadAllProjects();
  const filtered = all.filter((p) => p.id !== id);
  saveAllProjects(filtered);
}

export function archiveProject(id: string): void {
  const all = loadAllProjects();
  const updated = all.map((p) =>
    p.id === id ? { ...p, archived_at: new Date().toISOString() } : p,
  );
  saveAllProjects(updated);
}

export function unarchiveProject(id: string): void {
  const all = loadAllProjects();
  const updated = all.map((p) =>
    p.id === id ? { ...p, archived_at: null } : p,
  );
  saveAllProjects(updated);
}
