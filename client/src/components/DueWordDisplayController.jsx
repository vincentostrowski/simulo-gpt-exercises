import { useState } from "react";

// Component that controlls the due word display in the due view
const DueWordDisplayController = ({
  setRevealWord,
  setRevealLetter,
  word,
  revealWord,
  className,
}) => {
  const [letterIndex, setLetterIndex] = useState(0);

  // Reveals the next letter of the word if the whole word hasn't been revealed yet
  // If all letters have been revealed, reveals the whole word and resets `revealLetter`
  const handleRevealLetter = () => {
    if (!revealWord) {
      setRevealLetter(
        (prev) => prev + word.word.charAt(letterIndex).toUpperCase()
      );
      setLetterIndex(letterIndex + 1);
      if (letterIndex === word.word.length - 1) {
        setRevealWord(true);
        setRevealLetter("");
      } else {
        setRevealWord(false);
      }
    }
  };

  return (
    <div className={`${className} flex gap-5 w-full justify-center`}>
      <button
        onClick={() => {
          setRevealWord(true);
          setRevealLetter(false);
        }}
        className="bg-sky-950 text-gray-200 py-1 px-3 w-40 rounded-full"
      >
        Reveal Word
      </button>
      <button
        onClick={handleRevealLetter}
        className="bg-sky-950 text-gray-200 py-1 px-3 w-40 rounded-full"
      >
        Reveal Letter
      </button>
    </div>
  );
};

export default DueWordDisplayController;
