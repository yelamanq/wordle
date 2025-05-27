interface KeyboardProps {
  onKeyPress: (key: string) => void;
  guesses: string[];
  solution: string;
}

export default function Keyboard({
  onKeyPress,
  guesses,
  solution,
}: KeyboardProps) {
  const getKeyColor = (key: string) => {
    const wasUsed = guesses.some((guess) => guess.includes(key));
    if (!wasUsed) return "bg-[#E2E8F0] hover:bg-[#CBD5E1] active:bg-[#94A3B8]";

    const isCorrect = guesses.some((guess) =>
      guess
        .split("")
        .some((letter, index) => letter === key && solution[index] === key)
    );
    if (isCorrect)
      return "bg-[#10B981] hover:bg-[#059669] active:bg-[#047857] text-white";

    const isPresent = solution.includes(key);
    if (isPresent)
      return "bg-[#F59E0B] hover:bg-[#D97706] active:bg-[#B45309] text-white";

    return "bg-[#94A3B8] hover:bg-[#64748B] active:bg-[#475569] text-white";
  };

  const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "Backspace"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M", "Enter"],
  ];

  return (
    <div className="flex flex-col gap-2">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-2">
          {row.map((key) => {
            const isSpecialKey = key === "Enter" || key === "Backspace";
            const keyWidth = key === "Enter" ? "w-20" : "w-12";
            const bgColor = isSpecialKey
              ? "bg-[#1E293B] hover:bg-[#0F172A] active:bg-[#020617] text-white"
              : getKeyColor(key);

            return (
              <button
                key={key}
                onClick={() => onKeyPress(key)}
                className={`
                    ${keyWidth} h-14 rounded
                    font-bold text-[16px]
                    ${bgColor}
                    transition-colors
                  `}
              >
                {key === "Backspace" ? "⌫" : key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
