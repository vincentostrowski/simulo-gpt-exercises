const WordDisplayController = ({
  setRevealWord,
  setFirstLetter,
  word,
  revealWord,
  className,
}) => {
  return (
    <div className={`${className} flex gap-5 w-full justify-center`}>
      <button
        onClick={() => {
          setRevealWord(true);
          setFirstLetter(false);
        }}
        className="bg-sky-950 text-gray-200 py-1 px-3 w-40 rounded-full"
      >
        Reveal Word
      </button>
      <button
        onClick={() => {
          if (!revealWord) {
            setFirstLetter(word.word.charAt(0).toUpperCase());
            setRevealWord(false);
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
