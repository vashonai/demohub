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
import { Button } from "@/src/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  projectName: string;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmDialog({
  isOpen,
  projectName,
  onClose,
  onConfirm,
}: DeleteConfirmDialogProps) {
  const [confirmText, setConfirmText] = useState("");

  // Reset input when dialog opens/closes
  useEffect(() => {
    if (isOpen) {
      setConfirmText("");
    }
  }, [isOpen]);

  const isConfirmed = confirmText.toLowerCase().trim() === "delete";

  const handleConfirm = () => {
    if (isConfirmed) {
      onConfirm();
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && isConfirmed) {
      handleConfirm();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <DialogTitle className="text-lg">Delete Project</DialogTitle>
          </div>
          <DialogDescription>
            This will move{" "}
            <span className="font-semibold text-foreground">
              {projectName}
            </span>{" "}
            to the deletion bin. It will be permanently removed after 5 days.
          </DialogDescription>
        </DialogHeader>

        <div className="py-2">
          <Label htmlFor="confirm-delete" className="text-sm mb-2 block">
            Type <span className="font-mono font-semibold text-destructive">delete</span> to confirm
          </Label>
          <Input
            id="confirm-delete"
            placeholder='Type "delete" here...'
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            className="font-mono"
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={!isConfirmed}
          >
            Move to Bin
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
