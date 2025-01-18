import { Button } from '@/components/ui/button';
import { GameState, KeyboardState } from '@/types/game';

type KeyboardProps = {
  onKeyPress: (key: string) => void;
  gameState: GameState;
};

const KEYS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
];

export default function Keyboard({ onKeyPress, gameState }: KeyboardProps) {
  const keyboardState: KeyboardState = {};

  gameState.guesses.forEach((guess) => {
    const currentWord = gameState.words[gameState.currentWordIndex].word;
    guess.split('').forEach((letter, index) => {
      if (letter === currentWord[index]) {
        keyboardState[letter] = 'correct';
      } else if (currentWord.includes(letter)) {
        if (keyboardState[letter] !== 'correct') {
          keyboardState[letter] = 'present';
        }
      } else {
        if (!keyboardState[letter]) {
          keyboardState[letter] = 'absent';
        }
      }
    });
  });

  const getKeyColor = (key: string): string => {
    switch (keyboardState[key]) {
      case 'correct':
        return 'bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white';
      case 'present':
        return 'bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white';
      case 'absent':
        return 'bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700 text-white';
      default:
        return 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4  bg-white dark:bg-gray-800">
      <div className="flex flex-col items-center gap-2">
        {KEYS.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-2 ">
            {row.map((key) => (
              <Button
                key={key}
                onClick={() => onKeyPress(key)}
                className={`${getKeyColor(key)} ${
                  key === 'ENTER' || key === 'BACKSPACE' 
                    ? 'text-[10px] sm:text-xs px-1 sm:px-2 py-3 sm:py-4 min-w-[40px] sm:min-w-[50px] md:min-w-[70px]' 
                    : 'text-xs sm:text-sm px-2 sm:px-3 py-3 sm:py-4 min-w-[28px] sm:min-w-[36px] md:min-w-[48px]'
                } font-semibold rounded-lg shadow-md transition-all duration-200 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 uppercase`}
              >
                {key === 'BACKSPACE' ? '←' : key}
              </Button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

