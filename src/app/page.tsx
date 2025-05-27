"use client";

import Board from "@/components/shared/Board";
import Header from "@/components/shared/Header";
import Keyboard from "@/components/shared/Keyboard";
import words from "@/data/words.json";
import { useEffect, useState } from "react";
import { useWordleInput } from "@/hooks/useWordleInput";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Home() {
  const [solution, setSolution] = useState("HELLO");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameState, setGameState] = useState<"ongoing" | "won" | "lost">(
    "ongoing"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const solution = words[Math.floor(Math.random() * words.length)];
    // setSolution(solution);
  }, []);

  useEffect(() => {
    if (gameState !== "ongoing") {
      setIsModalOpen(true);
    }
  }, [gameState]);

  const { handleKeyPress } = useWordleInput({
    currentGuess,
    setCurrentGuess,
    guesses,
    setGuesses,
    gameState,
    solution,
    setGameState,
  });

  return (
    <div>
      <Header />
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="flex justify-center">
              <div className="w-10 h-10 rounded-full bg-[#10B981] opacity-20"></div>
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
      <div className="flex flex-col items-center gap-[100px] mt-[100px]">
        <Board
          solution={solution}
          guesses={guesses}
          currentGuess={currentGuess}
        />
        <Keyboard
          onKeyPress={handleKeyPress}
          guesses={guesses}
          solution={solution}
        />
      </div>
    </div>
  );
}
