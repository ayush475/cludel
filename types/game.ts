export type Word = {
  word: string;
  clue: string;
};

export type GameState = {
  words: Word[];
  currentWordIndex: number;
  guesses: string[];
  currentGuess: string;
  gameStatus: 'playing' | 'won' | 'lost';
};

export type LetterState = 'correct' | 'present' | 'absent' | 'unused';

export type KeyboardState = {
  [key: string]: LetterState;
};

