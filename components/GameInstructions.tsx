import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function GameInstructions() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto mb-2 sm:mb-4">How to Play</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>How to Play Cluedle</DialogTitle>
          <DialogDescription>
            Cluedle is a word-guessing game inspired by Wordle, but with clues!
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-2 sm:space-y-4 text-sm sm:text-base">
          <p>1. You have 4 attempts to guess 4 different words.</p>
          <p>2. Each word has a clue to help you guess.</p>
          <p>3. After each guess, the color of the tiles will change:</p>
          <ul className="list-disc list-inside pl-2">
            <li>Green: The letter is correct and in the right position.</li>
            <li>Yellow: The letter is in the word but in the wrong position.</li>
            <li>Gray: The letter is not in the word.</li>
          </ul>
          <p>4. Use the on-screen keyboard or your physical keyboard to enter guesses.</p>
          <p>5. Press Enter to submit your guess.</p>
          <p>Good luck and have fun!</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

