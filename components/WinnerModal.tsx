import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type WinnerModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function WinnerModal({ isOpen, onClose }: WinnerModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Congratulations!</DialogTitle>
        </DialogHeader>
        <div className="text-center space-y-4">
          <p className="text-lg">You&apso;ve guessed all the words correctly!</p>
          <Button onClick={onClose} className="w-full">Play Again</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

