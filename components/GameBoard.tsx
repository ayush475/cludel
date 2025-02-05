import { GameState } from "@/types/game";

type GameBoardProps = {
	gameState: GameState;
};

export default function GameBoard({ gameState }: GameBoardProps) {
	const currentWord = gameState.words[gameState.currentWordIndex].word;
	const maxLength = 10;

	return (
		<div className="grid gap-2 sm:gap-3 max-w-full overflow-x-auto mb-2 sm:mb-4">
			{[0, 1, 2, 3].map((row) => (
				<div key={row} className="flex justify-center gap-1 sm:gap-2">
					{Array.from({ length: currentWord.length }).map((_, col) => {
						const letter = gameState.guesses[row]?.[col] || "";
						const isActive = col < currentWord.length;
						const isTyped =
							row === gameState.guesses.length &&
							col < gameState.currentGuess.length;
						const isAnimated =
							isTyped ||
							(gameState.guesses[row] && col < gameState.guesses[row].length);

						let bgColor = "bg-gray-200 dark:bg-gray-700";
						if (!isActive && row === gameState.currentWordIndex) {
							bgColor = "bg-black dark:bg-gray-900";
						} else if (gameState.guesses[row]) {
							if (letter === currentWord[col]) {
								bgColor = "bg-green-500 dark:bg-green-600";
							} else if (currentWord.includes(letter)) {
								bgColor = "bg-yellow-500 dark:bg-yellow-600";
							} else {
								bgColor = "bg-gray-400 dark:bg-gray-500";
							}
						}

						return (
							<div
								key={col}
								className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 ${bgColor} flex items-center justify-center text-xs sm:text-sm md:text-base font-bold rounded-md border-2 ${
									isActive
										? "border-gray-300 dark:border-gray-600"
										: "border-transparent"
								} ${
									isAnimated ? "animate-pop" : ""
								} transition-all duration-300 ease-in-out shadow-sm`}
							>
								{isTyped ? gameState.currentGuess[col] : letter}
							</div>
						);
					})}
				</div>
			))}
		</div>
	);
}
