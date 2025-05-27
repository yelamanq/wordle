import { useEffect, useCallback } from "react";

interface UseWordleInputProps {
  currentGuess: string;
  setCurrentGuess: (guess: string) => void;
  guesses: string[];
  setGuesses: (guesses: string[]) => void;
  gameState: "ongoing" | "won" | "lost";
  solution: string;
  setGameState: (state: "ongoing" | "won" | "lost") => void;
}

export function useWordleInput({
  currentGuess,
  setCurrentGuess,
  guesses,
  setGuesses,
  gameState,
  solution,
  setGameState,
}: UseWordleInputProps) {
  const handleKeyPress = useCallback(
    (key: string) => {
      if (gameState !== "ongoing") return;

      if (key === "Enter") {
        if (currentGuess.length !== 5) return;

        const newGuesses = [...guesses, currentGuess];
        setGuesses(newGuesses);
        setCurrentGuess("");

        if (currentGuess === solution) {
          setGameState("won");
        } else if (newGuesses.length === 6) {
          setGameState("lost");
        }
      } else if (key === "Backspace") {
        setCurrentGuess(currentGuess.slice(0, -1));
      } else if (/^[a-zA-Z]$/.test(key) && currentGuess.length < 5) {
        setCurrentGuess(currentGuess + key.toUpperCase());
      }
    },
    [
      currentGuess,
      guesses,
      gameState,
      solution,
      setCurrentGuess,
      setGuesses,
      setGameState,
    ]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      handleKeyPress(e.key);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyPress]);

  return { handleKeyPress };
}
