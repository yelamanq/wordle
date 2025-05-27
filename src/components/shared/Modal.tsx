import { Check, RotateCcw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameState: "won" | "lost" | "ongoing";
}

export default function Modal({ isOpen, onClose, gameState }: ModalProps) {
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <div className="flex justify-center mb-3">
              {gameState === "won" ? (
                <div className="w-10 h-10 rounded-full bg-[#10B981] flex items-center justify-center">
                  <Check className="text-white mt-[3px] w-[18px] h-[18px]" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#94A3B8] flex items-center justify-center">
                  <RotateCcw className="text-white w-[18px] h-[18px]" />
                </div>
              )}
            </div>
            <DialogTitle className="flex justify-center">
              {gameState === "won" ? "Congratulations!" : "Game Over"}
            </DialogTitle>
            <DialogDescription className="flex justify-center">
              {gameState === "won"
                ? "You won the game! Great job!"
                : "You lost the game. Better luck next time!"}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
