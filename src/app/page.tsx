"use client";

import Board from "@/components/shared/Board";
import Header from "@/components/shared/Header";
import Keyboard from "@/components/shared/Keyboard";
import words from "@/data/words.json";
import { useEffect, useState } from "react";
import { useWordleInput } from "@/hooks/useWordleInput";
import Modal from "@/components/shared/Modal";

export default function Home() {
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameState, setGameState] = useState<"ongoing" | "won" | "lost">(
    "ongoing"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const solution = words[Math.floor(Math.random() * words.length)];
    setSolution(solution);
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
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        gameState={gameState}
        guesses={guesses}
        solution={solution}
      />
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
