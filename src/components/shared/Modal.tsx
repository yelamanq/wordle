import { Check, RotateCcw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import Stats from "./Stats";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameState: "won" | "lost" | "ongoing";
  guesses: string[];
  solution: string;
}

export default function Modal({
  isOpen,
  onClose,
  gameState,
  guesses,
  solution,
}: ModalProps) {
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-[400px] w-[400px]">
          <DialogHeader>
            <div className="flex justify-center mb-2">
              {gameState === "won" ? (
                <div className="w-10 h-10 rounded-full bg-[#10B981] flex items-center justify-center">
                  <Check className="text-white mt-[3px] w-[20px] h-[20px]" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#94A3B8] flex items-center justify-center">
                  <RotateCcw className="text-white w-[20px] h-[20px]" />
                </div>
              )}
            </div>
            <DialogTitle className="flex justify-center text-[22px] font-bold">
              {gameState === "won" ? "Congratulations!" : "Game Over!"}
            </DialogTitle>
            <DialogDescription className="flex justify-center text-[14px] font-medium">
              {gameState === "won"
                ? "You won the game! Great job!"
                : `The correct word was ${solution}. Better luck next time!`}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center">
            <Stats guesses={guesses} solution={solution} className="p-5" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
