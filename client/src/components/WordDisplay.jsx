const WordDisplay = ({ revealWord, word, revealLetter, className }) => {
  const colorClasses = {
    red: "text-red-600",
    orange: "text-orange-600",
    yellow: "text-yellow-600",
    green: "text-green-600",
    blue: "text-blue-600",
    indigo: "text-indigo-600",
    violet: "text-violet-600",
  };

  const colors = Object.keys(colorClasses); // Get the color names from the colorClasses object

  return (
    <div
      className={`${className} w-full flex justify-center items-center h-16`}
    >
      {revealWord && word && (
        <h1>
          {word.word
            .toUpperCase()
            .split("")
            .map((letter, index) => (
              <span
                key={index}
                className={colorClasses[colors[index % colors.length]]}
              >
                {letter}
              </span>
            ))}
        </h1>
      )}
      {revealLetter && <h1>{revealLetter}</h1>}
    </div>
  );
};

export default WordDisplay;
