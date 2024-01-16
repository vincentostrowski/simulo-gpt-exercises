import wordService from "../services/wordService";

const WordBrowseView = ({ word }) => {
  const onClick = async () => {
    if (window.confirm("Are you sure you want to delete this word?")) {
      try {
        await wordService.deleteWord(word.id);
      } catch (error) {
        console.log(error);
        alert("Something went wrong, try again.");
      }
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-1/3 p-2 border-b border-gray-200 flex justify-between text-shadow-md">
        <div>{word.word}</div>
        <button
          onClick={onClick}
          className="px-1 text-center bg-color1 text-white rounded text-xs"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default WordBrowseView;
