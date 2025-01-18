'use client'

import { useState, useEffect } from 'react';
import { words } from '../data/words';
import { GameState,  } from '../types/game';
import GameBoard from '@/components/GameBoard';
import Keyboard from '@/components/Keyboard';
import ThemeToggle from '@/components/ThemeToggle';
import WinnerModal from '@/components/WinnerModal';
import GameInstructions from '@/components/GameInstructions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeProvider } from 'next-themes';
import Footer from '@/components/Footer';

const animatePop = {
  '0%': { transform: 'scale(1)' },
  '50%': { transform: 'scale(1.1)' },
  '100%': { transform: 'scale(1)' },
};

const STORAGE_KEY = 'cluedleGameState';

export default function Cluedle() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      setGameState(JSON.parse(savedState));
    } else {
      initializeNewGame();
    }
  }, []);

  useEffect(() => {
    if (gameState) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    }
  }, [gameState]);

  const initializeNewGame = () => {
    const shuffledWords = [...words].sort(() => Math.random() - 0.5).slice(0, 4);
    setGameState({
      words: shuffledWords,
      currentWordIndex: 0,
      guesses: [],
      currentGuess: '',
      gameStatus: 'playing',
    });
  };

  const handleKeyPress = (key: string) => {
    if (!gameState || gameState.gameStatus !== 'playing') return;

    if (key === 'ENTER') {
      if (gameState.currentGuess.length === gameState.words[gameState.currentWordIndex].word.length) {
        const newGuesses = [...gameState.guesses, gameState.currentGuess];
        let newGameStatus: GameState['gameStatus'] = gameState.gameStatus;
        let newCurrentWordIndex = gameState.currentWordIndex;

        if (gameState.currentGuess === gameState.words[gameState.currentWordIndex].word) {
          if (gameState.currentWordIndex === gameState.words.length - 1) {
            newGameStatus = 'won';
            setShowWinnerModal(true);
          } else {
            newCurrentWordIndex++;
          }
        } else if (newGuesses.length === 4) {
          newGameStatus = 'lost';
        }

        setGameState(prev => ({
          ...prev!,
          guesses: newGuesses,
          currentGuess: '',
          gameStatus: newGameStatus,
          currentWordIndex: newCurrentWordIndex,
        }));
      }
    } else if (key === 'BACKSPACE') {
      setGameState(prev => ({ ...prev!, currentGuess: prev!.currentGuess.slice(0, -1) }));
    } else if (gameState.currentGuess.length < gameState.words[gameState.currentWordIndex].word.length) {
      setGameState(prev => ({ ...prev!, currentGuess: prev!.currentGuess + key }));
    }
  };

  const handlePlayAgain = () => {
    initializeNewGame();
    setShowWinnerModal(false);
  };

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <style jsx global>{`
        @keyframes pop {
          ${Object.entries(animatePop)
            .map(([key, value]) => `${key} { ${value} }`)
            .join('\n')}
        }
        .animate-pop {
          animation: pop 0.3s ease-in-out;
        }
      `}</style>
  <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-2 sm:p-4 transition-colors duration-200">        <Card className="w-full max-w-2xl mx-auto mb-4 bg-white dark:bg-gray-800 transition-colors duration-200">
  <CardHeader className="flex justify-between items-center p-3 sm:p-6">
  <CardTitle className="text-2xl sm:text-3xl font-bold text-center text-gray-800 dark:text-white">Cluedle</CardTitle>            <ThemeToggle />
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-8 p-3 sm:p-6">
            <GameInstructions />
            {gameState && (
              <>
 <p className="text-center font-medium text-base sm:text-lg text-gray-700 dark:text-gray-300">                  Clue: {gameState.words[gameState.currentWordIndex].clue}
                </p>
                <GameBoard gameState={gameState} />
                <div className="mt-4 sm:mt-8">
                  <Keyboard onKeyPress={handleKeyPress} gameState={gameState} />
                </div>
              </>
            )}
          </CardContent>
        </Card>
        <WinnerModal isOpen={showWinnerModal} onClose={handlePlayAgain} />
        <Footer creatorName="KUSU" />
      </div>
    </ThemeProvider>
  );
}

