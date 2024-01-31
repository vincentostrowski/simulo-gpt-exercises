import wordService from "../services/wordService";

const EaseDisplay = ({ word, onEaseSelection }) => {
  const easeSelect = async (ease) => {
    try {
      await wordService.updateWord(word.id, ease);
      onEaseSelection();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex justify-center fixed bottom-0 h-20">
      <button
        onClick={() => easeSelect("easy")}
        className="bg-green-500 flex-1 hover:bg-green-700 focus:ring-2 focus:ring-green-600   "
      >
        Easy (show in{" "}
        {`${word.interval * 2} day${word.interval * 2 > 1 ? "s" : ""}`})
      </button>
      <button
        onClick={() => easeSelect("medium")}
        className="bg-yellow-500 flex-1 hover:bg-yellow-700 focus:ring-2 focus:ring-yellow-600"
      >
        Medium (show in {`${word.interval} day${word.interval > 1 ? "s" : ""}`})
      </button>
      <button
        onClick={() => easeSelect("hard")}
        className="bg-red-500 flex-1 hover:bg-red-700 focus:ring-2 focus:ring-red-600"
      >
        Hard (show in{" "}
        {`${Math.max(Math.floor(word.interval / 2), 1)} day${
          Math.max(Math.floor(word.interval / 2), 1) > 1 ? "s" : ""
        }`}
        )
      </button>
    </div>
  );
};

export default EaseDisplay;
