import wordService from "../services/wordService";

// Component that allows user to select ease per due word in the due view
// Selected ease level affects when the word will be shown next
const EaseDisplay = ({ word, onEaseSelection }) => {
  const handleEaseSelect = async (ease) => {
    try {
      await wordService.updateWord(word.id, ease);
      onEaseSelection();
    } catch (error) {
      console.log(error);
    }
  };

  // Generate a string representing the number of days to display to the user
  const getDayString = (interval) =>
    `${interval} day${interval > 1 ? "s" : ""}`;

  return (
    <div className="w-full flex justify-center fixed bottom-0 h-20">
      <button
        onClick={() => handleEaseSelect("easy")}
        className="bg-green-500 flex-1 hover:bg-green-700 focus:ring-2 focus:ring-green-600   "
      >
        Easy (show in {getDayString(word.interval * 2)})
      </button>
      <button
        onClick={() => handleEaseSelect("medium")}
        className="bg-yellow-500 flex-1 hover:bg-yellow-700 focus:ring-2 focus:ring-yellow-600"
      >
        Medium (show in {getDayString(word.interval)})
      </button>
      <button
        onClick={() => handleEaseSelect("hard")}
        className="bg-red-500 flex-1 hover:bg-red-700 focus:ring-2 focus:ring-red-600"
      >
        Hard (show in {getDayString(Math.max(Math.floor(word.interval / 2), 1))}
        )
      </button>
    </div>
  );
};

export default EaseDisplay;
