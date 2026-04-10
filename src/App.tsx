import { useState, useMemo, useEffect } from "react";
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
} from "lucide-react";

import { AppData } from "./data/apps";
import { supabase } from "./lib/supabase";
import { ProjectDialog } from "@/src/components/ProjectDialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
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

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [demoFilter, setDemoFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"name" | "date">("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [apps, setApps] = useState<AppData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
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
        await fetchProjects(); // sync
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
        await fetchProjects(); // sync
      } else {
        console.error("Error adding project:", error);
        setErrorMsg("Insert failed: " + error.message);
      }
    }
  };

  const handleDeleteProject = async (id: string) => {
    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (!error) {
      // Forcefully refresh data directly from DB to mimic automatic refresh expectations
      await fetchProjects();
    } else {
      console.error("Error deleting project:", error);
      setErrorMsg("Delete failed: " + error.message);
    }
  };

  const categories = useMemo(() => {
    const cats = new Set(apps.map((app) => app.category));
    return ["all", ...Array.from(cats)];
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
        const matchesDemo =
          demoFilter === "all" ||
          (demoFilter === "with-demo" && app.demoUrl) ||
          (demoFilter === "no-demo" && !app.demoUrl);
        return matchesSearch && matchesCategory && matchesDemo;
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
  }, [searchQuery, categoryFilter, demoFilter, sortBy, apps]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
                <LayoutGrid className="w-6 h-6" />
              </div>
              <h1 className="text-xl font-bold tracking-tight">Demo Hub</h1>
            </div>

            <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search applications..."
                  className="pl-10 w-full bg-muted/50 border-none focus-visible:ring-1"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
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
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-medium border">
                VA
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-12">
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

        {/* Controls */}
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
              <Tabs
                value={demoFilter}
                onValueChange={setDemoFilter}
                className="w-auto"
              >
                <TabsList className="bg-muted/50">
                  <TabsTrigger value="all">All Apps</TabsTrigger>
                  <TabsTrigger value="with-demo">With Demo</TabsTrigger>
                  <TabsTrigger value="no-demo">No Demo</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex items-center gap-2">
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

              <Separator orientation="vertical" className="h-8 mx-1" />

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

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground mr-2">
              Categories:
            </span>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={categoryFilter === cat ? "default" : "outline"}
                size="sm"
                className="rounded-full h-8 px-4 capitalize"
                onClick={() => setCategoryFilter(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Grid/List View */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${viewMode}-${categoryFilter}-${demoFilter}-${sortBy}-${searchQuery}`}
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
            ) : filteredApps.length > 0 ? (
              filteredApps.map((app) => (
                <AppCard
                  key={app.id}
                  app={app}
                  viewMode={viewMode}
                  onEdit={() => {
                    setEditingProject(app);
                    setIsDialogOpen(true);
                  }}
                  onDelete={() => handleDeleteProject(app.id)}
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
                    setDemoFilter("all");
                  }}
                  className="mt-2"
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="border-t mt-20 py-12 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground p-1 rounded">
                <LayoutGrid className="w-4 h-4" />
              </div>
              <span className="font-bold">Demo Hub</span>
              <span className="text-muted-foreground text-sm ml-2">
                © 2026 Internal Tools Team
              </span>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Documentation
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Support
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Github className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Globe className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </footer>

      <ProjectDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveProject}
        initialData={editingProject}
      />
    </div>
  );
}

interface AppCardProps {
  app: AppData;
  viewMode: "grid" | "list";
  key?: string | number;
  onEdit: () => void;
  onDelete: () => void;
}

function AppCard({ app, viewMode, onEdit, onDelete }: AppCardProps) {
  const Icon = iconMap[app.icon] || LayoutGrid;

  if (viewMode === "list") {
    return (
      <Card className="hover:shadow-md transition-shadow group overflow-hidden border-muted/60">
        <CardContent className="p-4 flex items-center gap-6">
          <div className="bg-secondary p-3 rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold truncate">{app.name}</h3>
              <Badge
                variant="secondary"
                className="text-[10px] h-4 px-1.5 font-normal uppercase tracking-wider"
              >
                {app.category}
              </Badge>
              {app.status !== "active" && (
                <Badge
                  variant={app.status === "beta" ? "outline" : "destructive"}
                  className="text-[10px] h-4 px-1.5 font-normal uppercase tracking-wider"
                >
                  {app.status}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {app.description}
            </p>
            {app.lead && (
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <Users className="w-3.5 h-3.5 mr-1" /> Lead: {app.lead}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {app.demoUrl && (
              <Button
                variant="outline"
                size="sm"
                render={
                  <a
                    href={app.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                className="h-8"
              >
                <ExternalLink className="w-3.5 h-3.5 mr-2" />
                Demo
              </Button>
            )}
            {app.docsUrl && (
              <Button
                variant="ghost"
                size="sm"
                render={
                  <a
                    href={app.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                className="h-8"
              >
                <BookOpen className="w-3.5 h-3.5 mr-2" />
                Docs
              </Button>
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

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-all duration-300 group border-muted/60 hover:border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-secondary p-3 rounded-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 transform group-hover:scale-110">
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex flex-col items-end gap-1.5">
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
            <div className="mt-1">
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="ghost" size="icon" className="h-6 w-6" />
                  }
                >
                  <MoreVertical className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={onEdit}>
                    Edit Project
                  </DropdownMenuItem>
                  <DropdownMenuItem variant="destructive" onClick={onDelete}>
                    Delete Project
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        <CardTitle className="text-xl group-hover:text-primary transition-colors">
          {app.name}
        </CardTitle>
        <CardDescription className="line-clamp-2 min-h-[40px] mt-2">
          {app.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <div className="flex flex-col gap-3">
          {app.lead && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Users className="w-3.5 h-3.5 mr-2 opacity-70" />
              Lead:{" "}
              <span className="font-medium ml-1 text-foreground">
                {app.lead}
              </span>
            </div>
          )}
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5 mr-2 opacity-70" />
            Updated{" "}
            {new Date(app.lastUpdated).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </div>
      </CardContent>
      <Separator className="mx-6 w-auto opacity-50" />
      <CardFooter className="pt-4 gap-2">
        {app.demoUrl ? (
          <Button
            variant="default"
            size="sm"
            className="flex-1 shadow-sm"
            render={
              <a href={app.demoUrl} target="_blank" rel="noopener noreferrer" />
            }
          >
            <ExternalLink className="w-3.5 h-3.5 mr-2" />
            View Demo
          </Button>
        ) : (
          <Button
            variant="secondary"
            size="sm"
            className="flex-1 opacity-50 cursor-not-allowed"
            disabled
          >
            No Demo
          </Button>
        )}
        {app.docsUrl && (
          <Button
            variant="outline"
            size="icon"
            className="shrink-0"
            render={
              <a href={app.docsUrl} target="_blank" rel="noopener noreferrer" />
            }
            title="Documentation"
          >
            <BookOpen className="w-4 h-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
