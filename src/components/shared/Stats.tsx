interface StatsProps {
  guesses: string[];
  solution: string;
  className?: string;
}

export default function Stats({ guesses, solution, className }: StatsProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {guesses.map((word, index) => {
        return (
          <div key={index} className="flex gap-2">
            {word.split("").map((letter, index) => {
              return (
                <div
                  className={`w-[40px] h-[40px] rounded-sm flex items-center justify-center text-[20px] font-bold ${
                    letter === solution[index]
                      ? "bg-[#10B981]"
                      : solution.includes(letter)
                      ? "bg-[#F59E0B]"
                      : "bg-white border-[1.5px] border-[#d2d8e2]"
                  }`}
                  key={index}
                ></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
