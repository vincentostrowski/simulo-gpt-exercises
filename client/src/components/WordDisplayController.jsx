import { useState } from "react";

const WordDisplayController = ({
  setRevealWord,
  setRevealLetter,
  word,
  revealWord,
  className,
}) => {
  const [letterIndex, setLetterIndex] = useState(0);

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
        onClick={() => {
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
        }}
        className="bg-sky-950 text-gray-200 py-1 px-3 w-40 rounded-full"
      >
        Reveal Letter
      </button>
    </div>
  );
};

export default WordDisplayController;
