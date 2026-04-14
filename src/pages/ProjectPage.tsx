import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Save,
  Loader2,
  LayoutGrid,
  Users as UsersIcon,
  Package,
  LayoutDashboard,
  BarChart3,
  Activity,
  Briefcase,
  FileText,
  Wallet,
} from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { CategoryCombobox } from "@/src/components/CategoryCombobox";
import { AppData } from "@/src/data/apps";
import { supabase } from "@/src/lib/supabase";

const iconOptions = [
  { value: "Briefcase", label: "Briefcase", Icon: Briefcase },
  { value: "Users", label: "Team", Icon: UsersIcon },
  { value: "Package", label: "Package", Icon: Package },
  { value: "LayoutDashboard", label: "Dashboard", Icon: LayoutDashboard },
  { value: "BarChart3", label: "Analytics", Icon: BarChart3 },
  { value: "Activity", label: "Activity", Icon: Activity },
  { value: "FileText", label: "Document", Icon: FileText },
  { value: "Wallet", label: "Finance", Icon: Wallet },
  { value: "LayoutGrid", label: "Grid", Icon: LayoutGrid },
];

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "beta", label: "Beta" },
  { value: "deprecated", label: "Deprecated" },
];

export default function ProjectPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [lead, setLead] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [docsUrl, setDocsUrl] = useState("");
  const [category, setCategory] = useState("Internal Project");
  const [icon, setIcon] = useState("Briefcase");
  const [status, setStatus] = useState<"active" | "beta" | "deprecated">(
    "active"
  );

  // UI state
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingProject, setIsLoadingProject] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // All categories from DB
  const [allCategories, setAllCategories] = useState<string[]>([]);

  // Fetch all distinct categories
  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase
        .from("projects")
        .select("category")
        .not("category", "is", null);

      if (!error && data) {
        const unique = [
          ...new Set(
            data
              .map((d: { category: string }) => d.category)
              .filter(Boolean)
          ),
        ].sort() as string[];
        setAllCategories(unique);
      }
    }
    fetchCategories();
  }, []);

  // If editing, fetch the project
  useEffect(() => {
    if (!id) return;

    async function fetchProject() {
      setIsLoadingProject(true);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        setErrorMsg("Project not found");
        setIsLoadingProject(false);
        return;
      }

      const project = data as AppData;
      setName(project.name || "");
      setDescription(project.description || "");
      setLead(project.lead || "");
      setDemoUrl(project.demoUrl || "");
      setDocsUrl(project.docsUrl || "");
      setCategory(project.category || "Internal Project");
      setIcon(project.icon || "Briefcase");
      setStatus(project.status || "active");
      setIsLoadingProject(false);
    }

    fetchProject();
  }, [id]);

  const handleSave = async () => {
    if (!name.trim()) return;
    setIsSaving(true);
    setErrorMsg(null);

    const projectData: Partial<AppData> = {
      name: name.trim(),
      description,
      lead,
      demoUrl,
      docsUrl,
      category: category || "Internal Project",
      icon,
      status,
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    try {
      if (isEdit) {
        const { error } = await supabase
          .from("projects")
          .update(projectData)
          .eq("id", id);

        if (error) {
          setErrorMsg("Update failed: " + error.message);
          setIsSaving(false);
          return;
        }
      } else {
        const { error } = await supabase
          .from("projects")
          .insert([projectData])
          .select();

        if (error) {
          setErrorMsg("Create failed: " + error.message);
          setIsSaving(false);
          return;
        }
      }

      navigate("/");
    } catch (err: any) {
      setErrorMsg("Error: " + err?.message);
      setIsSaving(false);
    }
  };

  const SelectedIcon = useMemo(() => {
    return iconOptions.find((o) => o.value === icon)?.Icon || Briefcase;
  }, [icon]);

  if (isLoadingProject) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4" />
        <p className="text-muted-foreground">Loading project...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <img
                src="/logo.svg"
                alt="Intellibus Logo"
                className="w-8 h-8"
              />
              <div className="flex flex-col">
                <h1
                  className="text-lg font-bold tracking-tight leading-tight"
                  style={{ color: "#0D5495" }}
                >
                  INTELLIBUS
                </h1>
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest leading-none">
                  Demo Hub
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Page title */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight">
              {isEdit ? "Edit Project" : "New Project"}
            </h2>
            <p className="text-muted-foreground mt-1">
              {isEdit
                ? "Update the details of this project below."
                : "Fill in the details for your new project."}
            </p>
          </div>

          {errorMsg && (
            <div className="bg-destructive/15 text-destructive p-4 rounded-lg mb-6 border border-destructive/30 text-sm">
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <div className="space-y-6">
            {/* Project Name */}
            <div className="space-y-2">
              <Label htmlFor="project-name" className="text-sm font-medium">
                Project Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="project-name"
                placeholder="e.g. AI Optimization Pipeline"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="project-description" className="text-sm font-medium">
                Description
              </Label>
              <Textarea
                id="project-description"
                placeholder="Briefly describe what this project does..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="resize-none min-h-[120px]"
                rows={5}
              />
            </div>

            {/* Two-column row: Lead + Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="project-lead" className="text-sm font-medium">
                  Project Lead
                </Label>
                <Input
                  id="project-lead"
                  placeholder="e.g. John Doe"
                  value={lead}
                  onChange={(e) => setLead(e.target.value)}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Category</Label>
                <CategoryCombobox
                  value={category}
                  onChange={setCategory}
                  categories={allCategories}
                  placeholder="Select or type a category..."
                />
              </div>
            </div>

            {/* Two-column row: Icon + Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Icon</Label>
                <Select value={icon} onValueChange={setIcon}>
                  <SelectTrigger className="h-11">
                    <div className="flex items-center gap-2">
                      <SelectedIcon className="w-4 h-4 text-muted-foreground" />
                      <SelectValue placeholder="Select icon" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        <div className="flex items-center gap-2">
                          <opt.Icon className="w-4 h-4" />
                          {opt.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Status</Label>
                <Select value={status} onValueChange={(v: any) => setStatus(v)}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* URLs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="project-demo-url" className="text-sm font-medium">
                  Demo URL
                </Label>
                <Input
                  id="project-demo-url"
                  placeholder="https://..."
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project-docs-url" className="text-sm font-medium">
                  Documentation Link
                </Label>
                <Input
                  id="project-docs-url"
                  placeholder="https://..."
                  value={docsUrl}
                  onChange={(e) => setDocsUrl(e.target.value)}
                  className="h-11"
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="h-11 px-6"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={!name.trim() || isSaving}
                className="h-11 px-6 gap-2"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {isEdit ? "Save Changes" : "Create Project"}
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
