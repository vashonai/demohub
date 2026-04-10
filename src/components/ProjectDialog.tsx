import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { Button } from "@/src/components/ui/button";
import { AppData } from "@/src/data/apps";

interface ProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Partial<AppData>) => void;
  initialData?: AppData;
}

export function ProjectDialog({
  isOpen,
  onClose,
  onSave,
  initialData,
}: ProjectDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [lead, setLead] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [docsUrl, setDocsUrl] = useState("");
  const [category, setCategory] = useState("Internal Project");

  // Reset or populate form when dialog opens
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setName(initialData.name || "");
        setDescription(initialData.description || "");
        setLead(initialData.lead || "");
        setDemoUrl(initialData.demoUrl || "");
        setDocsUrl(initialData.docsUrl || "");
        setCategory(initialData.category || "Internal Project");
      } else {
        setName("");
        setDescription("");
        setLead("");
        setDemoUrl("");
        setDocsUrl("");
        setCategory("Internal Project");
      }
    }
  }, [isOpen, initialData]);

  const handleSave = () => {
    // Validate minimally
    if (!name.trim()) return;

    onSave({
      name,
      description,
      lead,
      demoUrl,
      docsUrl,
      category: category || "Internal Project", // Use the inputted category or default
      icon: initialData?.icon || "Briefcase",
      status: initialData?.status || "active",
      lastUpdated: new Date().toISOString().split("T")[0], // Always update timestamp on save
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Project" : "Add New Project"}
          </DialogTitle>
          <DialogDescription>
            {initialData
              ? "Update the details of this project below. Click save when you're done."
              : "Enter the details for the new project here. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">
              Project Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="e.g. AI Optimization Pipeline"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Briefly describe what this project does..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="lead">Project Lead</Label>
            <Input
              id="lead"
              placeholder="e.g. John Doe"
              value={lead}
              onChange={(e) => setLead(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              placeholder="e.g. Engineering, Sales, Internal Project"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="demoUrl">Demo URL</Label>
            <Input
              id="demoUrl"
              placeholder="https://..."
              value={demoUrl}
              onChange={(e) => setDemoUrl(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="docsUrl">Documentation Link</Label>
            <Input
              id="docsUrl"
              placeholder="https://..."
              value={docsUrl}
              onChange={(e) => setDocsUrl(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!name.trim()}>
            Save details
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
