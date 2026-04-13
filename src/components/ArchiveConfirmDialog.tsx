import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Archive } from "lucide-react";

interface ArchiveConfirmDialogProps {
  isOpen: boolean;
  projectName: string;
  onClose: () => void;
  onConfirm: () => void;
}

export function ArchiveConfirmDialog({
  isOpen,
  projectName,
  onClose,
  onConfirm,
}: ArchiveConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
              <Archive className="w-5 h-5 text-amber-600" />
            </div>
            <DialogTitle className="text-lg">Archive Project</DialogTitle>
          </div>
          <DialogDescription>
            Should we proceed to archive{" "}
            <span className="font-semibold text-foreground">
              {projectName}
            </span>
            ? It will be removed from the main view but can be accessed from the
            archive section.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className="bg-amber-600 text-white hover:bg-amber-700"
          >
            <Archive className="w-4 h-4 mr-1.5" />
            Archive
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
