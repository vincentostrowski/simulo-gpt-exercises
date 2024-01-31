// Component that displays a due word in multiple colors on the Due view
const DueWordDisplay = ({ revealWord, word, revealLetter, className }) => {
  // Colors iterated over for each letter of revealed word
  const colorClasses = {
    red: "text-red-600",
    orange: "text-orange-600",
    yellow: "text-yellow-600",
    blue: "text-blue-600",
    indigo: "text-indigo-600",
    violet: "text-violet-600",
  };

  // Get the color names from the colorClasses object
  const colors = Object.keys(colorClasses);

  const renderLetter = (letter, index) => (
    <span
      key={letter + index}
      className={colorClasses[colors[index % colors.length]]}
    >
      {letter}
    </span>
  );

  return (
    <div
      className={`${className} w-full flex justify-center items-center h-16 text-shadow`}
    >
      {revealWord && word && (
        <h1>{word.word.toUpperCase().split("").map(renderLetter)}</h1>
      )}
      {revealLetter && <h1>{revealLetter}</h1>}
    </div>
  );
};

export default DueWordDisplay;
