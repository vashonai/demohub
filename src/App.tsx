import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  ArrowUpDown,
  ExternalLink,
  BookOpen,
  Calendar,
  LayoutGrid,
  List,
  Plus,
  Github,
  Globe,
  Users,
  Package,
  LayoutDashboard,
  BarChart3,
  Activity,
  Briefcase,
  FileText,
  Wallet,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Filter,
  Trash2,
  RotateCcw,
  Archive,
} from "lucide-react";

import { AppData } from "./data/apps";
import { supabase } from "./lib/supabase";
import { ProjectDialog } from "@/src/components/ProjectDialog";
import { DeleteConfirmDialog } from "@/src/components/DeleteConfirmDialog";
import { ArchiveConfirmDialog } from "@/src/components/ArchiveConfirmDialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Separator } from "@/src/components/ui/separator";

const iconMap: Record<string, any> = {
  Users,
  Package,
  LayoutDashboard,
  BarChart3,
  Activity,
  Briefcase,
  FileText,
  Wallet,
};

const PAGE_SIZE = 12;

// ─── Gradient palette for cards without iframe previews ───
const cardGradients = [
  "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)",
  "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
  "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
  "linear-gradient(135deg, #14b8a6 0%, #0ea5e9 100%)",
  "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
  "linear-gradient(135deg, #10b981 0%, #059669 100%)",
  "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
  "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)",
];

function getGradientForId(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return cardGradients[Math.abs(hash) % cardGradients.length];
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [sortBy, setSortBy] = useState<"name" | "date">("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);

  const [apps, setApps] = useState<AppData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // ─── Bin state ───
  const [showBin, setShowBin] = useState(false);
  const [binnedApps, setBinnedApps] = useState<AppData[]>([]);
  const [binnedCount, setBinnedCount] = useState(0);

  // ─── Delete confirmation dialog state ───
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<AppData | null>(null);

  // ─── Archive state ───
  const [showArchive, setShowArchive] = useState(false);
  const [archivedApps, setArchivedApps] = useState<AppData[]>([]);
  const [archivedCount, setArchivedCount] = useState(0);
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);
  const [projectToArchive, setProjectToArchive] = useState<AppData | null>(null);

  useEffect(() => {
    fetchProjects();
    autoPurgeExpired();
  }, []);

  useEffect(() => {
    fetchBinnedCount();
    fetchArchivedCount();
  }, [apps]);

  async function fetchProjects() {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .is("deleted_at", null)
        .is("archived_at", null)
        .order("name", { ascending: true });

      if (error) {
        console.error("Error fetching projects:", error);
        setErrorMsg("Error fetching: " + error.message);
      } else {
        setApps(data as AppData[]);
      }
    } catch (err: any) {
      setErrorMsg("Fetch caught error: " + err?.message);
    }
    setIsLoading(false);
  }

  async function fetchBinnedProjects() {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .not("deleted_at", "is", null)
      .order("deleted_at", { ascending: false });

    if (!error && data) {
      setBinnedApps(data as AppData[]);
    }
  }

  async function fetchBinnedCount() {
    const { count, error } = await supabase
      .from("projects")
      .select("*", { count: "exact", head: true })
      .not("deleted_at", "is", null);

    if (!error) {
      setBinnedCount(count || 0);
    }
  }

  async function autoPurgeExpired() {
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

    const { error } = await supabase
      .from("projects")
      .delete()
      .lt("deleted_at", fiveDaysAgo.toISOString());

    if (error) {
      console.error("Auto-purge error:", error);
    }
  }

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<AppData | undefined>(
    undefined,
  );

  const handleSaveProject = async (projectData: Partial<AppData>) => {
    if (editingProject) {
      const { error } = await supabase
        .from("projects")
        .update(projectData)
        .eq("id", editingProject.id);

      if (!error) {
        await fetchProjects();
      } else {
        console.error("Error updating project:", error);
        setErrorMsg("Update failed: " + error.message);
      }
    } else {
      const { data, error } = await supabase
        .from("projects")
        .insert([projectData])
        .select();

      if (!error && data) {
        await fetchProjects();
      } else {
        console.error("Error adding project:", error);
        setErrorMsg("Insert failed: " + error.message);
      }
    }
  };

  // ─── Soft delete (move to bin) ───
  const handleSoftDelete = async (id: string) => {
    const { error } = await supabase
      .from("projects")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);

    if (!error) {
      await fetchProjects();
      await fetchBinnedCount();
      if (showBin) await fetchBinnedProjects();
    } else {
      console.error("Error soft-deleting project:", error);
      setErrorMsg("Delete failed: " + error.message);
    }
  };

  // ─── Restore from bin ───
  const handleRestore = async (id: string) => {
    const { error } = await supabase
      .from("projects")
      .update({ deleted_at: null })
      .eq("id", id);

    if (!error) {
      await fetchProjects();
      await fetchBinnedProjects();
      await fetchBinnedCount();
    } else {
      console.error("Error restoring project:", error);
      setErrorMsg("Restore failed: " + error.message);
    }
  };

  // ─── Permanent delete ───
  const handlePermanentDelete = async (id: string) => {
    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (!error) {
      await fetchBinnedProjects();
      await fetchBinnedCount();
    } else {
      console.error("Error permanently deleting:", error);
      setErrorMsg("Permanent delete failed: " + error.message);
    }
  };

  // ─── Open delete confirmation ───
  const openDeleteConfirm = (app: AppData) => {
    setProjectToDelete(app);
    setDeleteDialogOpen(true);
  };

  // ─── Archive handlers ───
  const openArchiveConfirm = (app: AppData) => {
    setProjectToArchive(app);
    setArchiveDialogOpen(true);
  };

  const handleArchive = async (id: string) => {
    const { error } = await supabase
      .from("projects")
      .update({ archived_at: new Date().toISOString() })
      .eq("id", id);

    if (!error) {
      await fetchProjects();
      await fetchArchivedCount();
      if (showArchive) await fetchArchivedProjects();
    } else {
      console.error("Error archiving project:", error);
      setErrorMsg("Archive failed: " + error.message);
    }
  };

  const handleUnarchive = async (id: string) => {
    const { error } = await supabase
      .from("projects")
      .update({ archived_at: null })
      .eq("id", id);

    if (!error) {
      await fetchProjects();
      await fetchArchivedProjects();
      await fetchArchivedCount();
    } else {
      console.error("Error unarchiving:", error);
      setErrorMsg("Unarchive failed: " + error.message);
    }
  };

  async function fetchArchivedProjects() {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .not("archived_at", "is", null)
      .is("deleted_at", null)
      .order("archived_at", { ascending: false });

    if (!error && data) {
      setArchivedApps(data as AppData[]);
    }
  }

  async function fetchArchivedCount() {
    const { count, error } = await supabase
      .from("projects")
      .select("*", { count: "exact", head: true })
      .not("archived_at", "is", null)
      .is("deleted_at", null);

    if (!error) {
      setArchivedCount(count || 0);
    }
  }

  const categories = useMemo(() => {
    const cats = new Set(apps.map((app) => app.category));
    return ["all", ...Array.from(cats).sort()];
  }, [apps]);

  const filteredApps = useMemo(() => {
    return apps
      .filter((app) => {
        const matchesSearch =
          (app.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
          (app.description || "")
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchesCategory =
          categoryFilter === "all" || app.category === categoryFilter;
        // Default: only show projects with a demo URL
        const matchesLinkFilter = showAll || !!app.demoUrl;
        return matchesSearch && matchesCategory && matchesLinkFilter;
      })
      .sort((a, b) => {
        if (sortBy === "name") {
          return (a.name || "").localeCompare(b.name || "");
        } else {
          return (
            new Date(b.lastUpdated || Date.now()).getTime() -
            new Date(a.lastUpdated || Date.now()).getTime()
          );
        }
      });
  }, [searchQuery, categoryFilter, showAll, sortBy, apps]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, categoryFilter, showAll, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredApps.length / PAGE_SIZE));
  const paginatedApps = filteredApps.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const goToPage = useCallback(
    (page: number) => {
      setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    },
    [totalPages],
  );

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="brand-gradient p-2 rounded-xl shadow-md">
                <LayoutGrid className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-bold tracking-tight leading-tight brand-gradient-text">
                  INTELLIBUS
                </h1>
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest leading-none">
                  Demo Hub
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex items-center gap-2"
                onClick={() => {
                  setEditingProject(undefined);
                  setIsDialogOpen(true);
                }}
              >
                <Plus className="w-4 h-4" />
                New App
              </Button>
              <Button
                variant={showBin ? "secondary" : "ghost"}
                size="icon"
                className="relative"
                onClick={() => {
                  setShowBin(!showBin);
                  if (!showBin) fetchBinnedProjects();
                }}
                title="Deletion Bin"
              >
                <Trash2 className="w-4 h-4" />
                {binnedCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {binnedCount > 9 ? "9+" : binnedCount}
                  </span>
                )}
              </Button>
              <Button
                variant={showArchive ? "secondary" : "ghost"}
                size="icon"
                className="relative"
                onClick={() => {
                  setShowArchive(!showArchive);
                  if (!showArchive) fetchArchivedProjects();
                }}
                title="Archived Projects"
              >
                <Archive className="w-4 h-4" />
                {archivedCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {archivedCount > 9 ? "9+" : archivedCount}
                  </span>
                )}
              </Button>
              <div className="w-8 h-8 rounded-full brand-gradient flex items-center justify-center text-xs font-bold text-white shadow-md">
                IB
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            Internal Application Hub
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Access all internal tools, demos, and documentation from a single
            central point. Streamline your workflow and stay updated with the
            latest releases.
          </p>
        </div>

        {errorMsg && (
          <div className="bg-destructive/15 text-destructive p-4 rounded-md mb-6 border border-destructive/30">
            <h3 className="font-semibold">Oops! Something went wrong</h3>
            <p className="text-sm">{errorMsg}</p>
          </div>
        )}

        {/* ─── Controls Bar: Search (left) | Filters (right) ─── */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8">
          {/* Search — left */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="search-input"
              placeholder="Search projects..."
              className="pl-10 w-full bg-muted/50 border-none focus-visible:ring-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filters — right */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Category dropdown */}
            <Select
              value={categoryFilter}
              onValueChange={(v: any) => setCategoryFilter(v)}
            >
              <SelectTrigger className="w-[160px] bg-muted/50 border-none">
                <Filter className="w-3.5 h-3.5 mr-2 opacity-50" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    <span className="capitalize">{cat === "all" ? "All Categories" : cat}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort dropdown */}
            <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
              <SelectTrigger className="w-[160px] bg-muted/50 border-none">
                <ArrowUpDown className="w-3.5 h-3.5 mr-2 opacity-50" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="date">Recently Updated</SelectItem>
              </SelectContent>
            </Select>

            <Separator orientation="vertical" className="h-8 mx-1 hidden sm:block" />

            {/* Show All toggle */}
            <Button
              variant={showAll ? "secondary" : "outline"}
              size="sm"
              className="gap-1.5"
              onClick={() => setShowAll(!showAll)}
              title={showAll ? "Showing all projects" : "Showing only projects with links"}
            >
              {showAll ? (
                <Eye className="w-3.5 h-3.5" />
              ) : (
                <EyeOff className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline">{showAll ? "All" : "With Links"}</span>
            </Button>

            <Separator orientation="vertical" className="h-8 mx-1 hidden sm:block" />

            {/* View mode toggle */}
            <div className="flex items-center bg-muted/50 rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                className="w-8 h-8"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon"
                className="w-8 h-8"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            {filteredApps.length} project{filteredApps.length !== 1 ? "s" : ""} found
            {!showAll && (
              <span className="ml-1 opacity-70">
                · showing projects with links only
              </span>
            )}
          </p>
        </div>

        {/* ─── Bin View ─── */}
        {showBin && (
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Deletion Bin</h3>
                <p className="text-sm text-muted-foreground">
                  Projects are permanently deleted after 5 days
                </p>
              </div>
            </div>

            {binnedApps.length === 0 ? (
              <div className="py-12 text-center border border-dashed rounded-xl">
                <Trash2 className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground">No deleted projects</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {binnedApps.map((app) => {
                  const deletedDate = new Date(app.deleted_at!);
                  const expiresDate = new Date(deletedDate);
                  expiresDate.setDate(expiresDate.getDate() + 5);
                  const daysLeft = Math.max(
                    0,
                    Math.ceil(
                      (expiresDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                    )
                  );

                  return (
                    <div
                      key={app.id}
                      className="flex items-center gap-4 p-4 rounded-xl border bg-card ring-1 ring-destructive/10"
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 opacity-60"
                        style={{ background: getGradientForId(app.id) }}
                      >
                        {(() => {
                          const Icon = iconMap[app.icon] || LayoutGrid;
                          return <Icon className="w-4 h-4 text-white" />;
                        })()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm line-through opacity-70">
                          {app.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Deleted{" "}
                          {deletedDate.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                          {" · "}
                          <span
                            className={daysLeft <= 1 ? "text-destructive font-medium" : ""}
                          >
                            {daysLeft} day{daysLeft !== 1 ? "s" : ""} until permanent
                            deletion
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1.5 h-7 text-xs"
                          onClick={() => handleRestore(app.id)}
                        >
                          <RotateCcw className="w-3 h-3" />
                          Restore
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="gap-1.5 h-7 text-xs"
                          onClick={() => handlePermanentDelete(app.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete Forever
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <Separator className="mt-8" />
          </div>
        )}

        {/* ─── Archive View ─── */}
        {showArchive && (
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Archive className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Archived Projects</h3>
                <p className="text-sm text-muted-foreground">
                  Projects removed from the main view
                </p>
              </div>
            </div>

            {archivedApps.length === 0 ? (
              <div className="py-12 text-center border border-dashed rounded-xl">
                <Archive className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground">No archived projects</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {archivedApps.map((app) => {
                  const archivedDate = new Date(app.archived_at!);
                  return (
                    <div
                      key={app.id}
                      className="flex items-center gap-4 p-4 rounded-xl border bg-card ring-1 ring-amber-500/10"
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 opacity-70"
                        style={{ background: getGradientForId(app.id) }}
                      >
                        {(() => {
                          const Icon = iconMap[app.icon] || LayoutGrid;
                          return <Icon className="w-4 h-4 text-white" />;
                        })()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm">
                          {app.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Archived{" "}
                          {archivedDate.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                          {app.category && (
                            <span> · {app.category}</span>
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1.5 h-7 text-xs"
                          onClick={() => handleUnarchive(app.id)}
                        >
                          <RotateCcw className="w-3 h-3" />
                          Unarchive
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <Separator className="mt-8" />
          </div>
        )}

        {/* Grid/List View */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${viewMode}-${categoryFilter}-${showAll}-${sortBy}-${searchQuery}-${currentPage}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "flex flex-col gap-4"
            }
          >
            {isLoading ? (
              <div className="col-span-full py-20 text-center flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
                <h3 className="text-lg font-semibold">Loading projects...</h3>
                <p className="text-muted-foreground mt-2">
                  Connecting to Supabase Database
                </p>
              </div>
            ) : paginatedApps.length > 0 ? (
              paginatedApps.map((app) => (
                <AppCard
                  key={app.id}
                  app={app}
                  viewMode={viewMode}
                  onEdit={() => {
                    setEditingProject(app);
                    setIsDialogOpen(true);
                  }}
                  onDelete={() => openDeleteConfirm(app)}
                  onArchive={() => openArchiveConfirm(app)}
                />
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <div className="bg-muted/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground opacity-20" />
                </div>
                <h3 className="text-lg font-semibold">No applications found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters to find what you're
                  looking for.
                </p>
                <Button
                  variant="link"
                  onClick={() => {
                    setSearchQuery("");
                    setCategoryFilter("all");
                    setShowAll(true);
                  }}
                  className="mt-2"
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ─── Pagination ─── */}
        {!isLoading && filteredApps.length > PAGE_SIZE && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              className="pagination-btn"
              disabled={currentPage <= 1}
              onClick={() => goToPage(currentPage - 1)}
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Show max 7 page buttons with ellipsis
              if (
                totalPages <= 7 ||
                page === 1 ||
                page === totalPages ||
                Math.abs(page - currentPage) <= 1
              ) {
                return (
                  <button
                    key={page}
                    className={`pagination-btn ${page === currentPage ? "pagination-btn-active" : ""}`}
                    onClick={() => goToPage(page)}
                    aria-label={`Page ${page}`}
                    aria-current={page === currentPage ? "page" : undefined}
                  >
                    {page}
                  </button>
                );
              } else if (
                page === currentPage - 2 ||
                page === currentPage + 2
              ) {
                return (
                  <span key={page} className="px-1 text-muted-foreground text-sm">
                    …
                  </span>
                );
              }
              return null;
            })}

            <button
              className="pagination-btn"
              disabled={currentPage >= totalPages}
              onClick={() => goToPage(currentPage + 1)}
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </main>

      <footer className="border-t mt-20 py-8 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3">
            <div className="brand-gradient p-1.5 rounded-lg shadow-sm">
              <LayoutGrid className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold brand-gradient-text">INTELLIBUS</span>
            <span className="text-muted-foreground text-sm ml-2">
              © 2026 Intellibus
            </span>
          </div>
        </div>
      </footer>

      <ProjectDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveProject}
        initialData={editingProject}
      />

      <DeleteConfirmDialog
        isOpen={deleteDialogOpen}
        projectName={projectToDelete?.name || ""}
        onClose={() => {
          setDeleteDialogOpen(false);
          setProjectToDelete(null);
        }}
        onConfirm={() => {
          if (projectToDelete) {
            handleSoftDelete(projectToDelete.id);
          }
        }}
      />

      <ArchiveConfirmDialog
        isOpen={archiveDialogOpen}
        projectName={projectToArchive?.name || ""}
        onClose={() => {
          setArchiveDialogOpen(false);
          setProjectToArchive(null);
        }}
        onConfirm={() => {
          if (projectToArchive) {
            handleArchive(projectToArchive.id);
          }
        }}
      />
    </div>
  );
}

// ─── IframePreview component ───

function IframePreview({ url, appId, icon }: { url?: string; appId: string; icon: string }) {
  const [iframeFailed, setIframeFailed] = useState(false);
  const Icon = iconMap[icon] || LayoutGrid;
  const gradient = getGradientForId(appId);

  if (!url || iframeFailed) {
    return (
      <div
        className="iframe-preview-fallback"
        style={{ background: gradient }}
      >
        <div className="absolute inset-0 bg-black/10" />
        <Icon className="w-12 h-12 text-white/80 relative z-10" />
      </div>
    );
  }

  return (
    <div className="iframe-preview">
      <iframe
        src={url}
        title="Preview"
        sandbox="allow-scripts allow-same-origin"
        loading="lazy"
        onError={() => setIframeFailed(true)}
      />
      {/* Overlay to prevent interaction */}
      <div className="absolute inset-0 z-[1]" />
    </div>
  );
}

// ─── App Card component ───

interface AppCardProps {
  app: AppData;
  viewMode: "grid" | "list";
  key?: string | number;
  onEdit: () => void;
  onDelete: () => void;
  onArchive: () => void;
}

function AppCard({ app, viewMode, onEdit, onDelete, onArchive }: AppCardProps) {
  const Icon = iconMap[app.icon] || LayoutGrid;
  const linkUrl = app.demoUrl || app.docsUrl;

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on interactive elements
    if ((e.target as HTMLElement).closest("[data-slot='dropdown-menu']") ||
        (e.target as HTMLElement).closest("[data-slot='button']") ||
        (e.target as HTMLElement).closest("a") ||
        (e.target as HTMLElement).closest(".docs-btn")) {
      return;
    }
    if (linkUrl) {
      window.open(linkUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleDocsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (app.docsUrl) {
      window.open(app.docsUrl, "_blank", "noopener,noreferrer");
    }
  };

  if (viewMode === "list") {
    return (
      <Card
        className={`hover:shadow-md transition-shadow group overflow-hidden border-muted/60 card-hover-lift ${linkUrl ? "card-clickable" : ""}`}
        onClick={handleCardClick}
      >
        <CardContent className="p-4 flex items-center gap-4">
          {/* Small icon/gradient preview */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
            style={{ background: getGradientForId(app.id) }}
          >
            <Icon className="w-5 h-5 text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold group-hover:text-[var(--brand-mid)] transition-colors">
                {app.name}
              </h3>
              <Badge
                variant="secondary"
                className="text-[10px] h-4 px-1.5 font-normal uppercase tracking-wider shrink-0"
              >
                {app.category}
              </Badge>
              {app.status !== "active" && (
                <Badge
                  variant={app.status === "beta" ? "outline" : "destructive"}
                  className="text-[10px] h-4 px-1.5 font-normal uppercase tracking-wider shrink-0"
                >
                  {app.status}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {app.description}
            </p>
            <div className="flex items-center gap-4 mt-1">
              {app.lead && (
                <div className="flex items-center text-xs text-muted-foreground">
                  <Users className="w-3.5 h-3.5 mr-1" /> {app.lead}
                </div>
              )}
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="w-3.5 h-3.5 mr-1" />
                {new Date(app.lastUpdated).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>

          {/* Docs + link indicator + actions */}
          <div className="flex items-center gap-2 shrink-0" onClick={e => e.stopPropagation()}>
            {app.docsUrl && (
              <Button
                variant="outline"
                size="sm"
                className="docs-btn h-7 gap-1.5 text-xs"
                onClick={handleDocsClick}
                title="View Documentation"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Docs
              </Button>
            )}
            {linkUrl && (
              <div className="text-muted-foreground">
                <ExternalLink className="w-4 h-4" />
              </div>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" size="icon" className="h-8 w-8" />
                }
              >
                <MoreVertical className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onEdit}>
                    Edit Project
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onArchive}>
                    Archive Project
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive" onClick={onDelete}>
                    Delete Project
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    );
  }

  // ─── Grid card ───
  return (
    <Card
      className={`relative flex flex-col h-full transition-all duration-300 group border-muted/60 hover:border-primary/20 card-hover-lift overflow-hidden ${linkUrl ? "card-clickable" : ""}`}
      onClick={handleCardClick}
    >
      {/* Iframe preview / gradient fallback */}
      <IframePreview url={app.demoUrl} appId={app.id} icon={app.icon} />

      {/* Card actions overlay */}
      <div className="card-actions-overlay" onClick={e => e.stopPropagation()}>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="secondary"
                size="icon"
                className="h-7 w-7 rounded-full shadow-md bg-background/90 backdrop-blur"
              />
            }
          >
            <MoreVertical className="w-3.5 h-3.5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEdit}>Edit Project</DropdownMenuItem>
            <DropdownMenuItem onClick={onArchive}>Archive Project</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={onDelete}>
              Delete Project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <CardHeader className="pb-2 pt-4">
        <div className="flex items-center gap-2 mb-1">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: getGradientForId(app.id) }}
          >
            <Icon className="w-3.5 h-3.5 text-white" />
          </div>
          <CardTitle className="text-base group-hover:text-[var(--brand-mid)] transition-colors break-words">
            {app.name}
          </CardTitle>
        </div>
        <CardDescription className="line-clamp-2 min-h-[40px]">
          {app.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center flex-wrap gap-1.5">
            <Badge
              variant="secondary"
              className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0"
            >
              {app.category}
            </Badge>
            {app.status !== "active" && (
              <Badge
                variant={app.status === "beta" ? "outline" : "destructive"}
                className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0"
              >
                {app.status}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
            {app.lead && (
              <div className="flex items-center">
                <Users className="w-3 h-3 mr-1 opacity-70" />
                {app.lead}
              </div>
            )}
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-1 opacity-70" />
              {new Date(app.lastUpdated).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      </CardContent>

      {/* Bottom bar: link indicator + docs button */}
      {(linkUrl || app.docsUrl) && (
        <div className="px-4 pb-3 pt-0">
          <div className="flex items-center justify-between gap-2">
            {linkUrl && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground group-hover:text-[var(--brand-mid)] transition-colors min-w-0 overflow-hidden">
                <ExternalLink className="w-3 h-3 shrink-0" />
                <span className="truncate opacity-70">{new URL(linkUrl).hostname}</span>
              </div>
            )}
            {app.docsUrl && (
              <button
                className="docs-btn inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-[var(--brand-mid)] transition-colors shrink-0 ml-auto"
                onClick={handleDocsClick}
                title="View Documentation"
              >
                <BookOpen className="w-3 h-3" />
                <span>Docs</span>
              </button>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
