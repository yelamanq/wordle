interface BoardProps {
  solution: string;
  guesses: string[];
  currentGuess: string;
}

export default function Board({ solution, guesses, currentGuess }: BoardProps) {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 6 }).map((_, rowIndex) => {
        const guess =
          rowIndex < guesses.length
            ? guesses[rowIndex]
            : rowIndex === guesses.length
            ? currentGuess
            : "";

        return (
          <div key={rowIndex} className="flex gap-2">
            {Array.from({ length: 5 }).map((_, colIndex) => {
              const letter = guess[colIndex] || "";
              let bgColor = "bg-white border-2 border-[#D0D5DD]";

              if (guess && rowIndex < guesses.length) {
                if (letter === solution[colIndex]) {
                  bgColor = "bg-[#10B981] text-white";
                } else if (solution.includes(letter)) {
                  bgColor = "bg-[#F59E0B] text-white";
                } else {
                  bgColor = "bg-[#94A3B8] text-white";
                }
              }

              return (
                <div
                  key={colIndex}
                  className={`w-13 h-13 rounded-md flex items-center justify-center text-[20px] font-bold uppercase ${bgColor}`}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
