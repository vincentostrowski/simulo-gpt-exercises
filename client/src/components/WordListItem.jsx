// Component to display a word in the words list on added page
// Allows the user to update the order of the word or delete the word
import wordService from "../services/wordService";
import { useState } from "react";

const WordListItem = ({ word, newFilter }) => {
  const [order, setOrder] = useState(
    word.newOrder === null ? "" : word.newOrder
  );

  // Submitted state used in conjunction with onBlur
  // to rest input fields to original value when focus lost and no submission
  const [submitted, setSubmitted] = useState(false);

  const onBlur = () => {
    if (!submitted) {
      setOrder(word.newOrder);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await wordService.updateWord(word.id, undefined, order);
      document.activeElement.blur();
    } catch (error) {
      console.log(error);
      alert("Something went wrong, try again.");
    }
  };

  const onClickDelete = async () => {
    if (window.confirm("Are you sure you want to delete this word?")) {
      try {
        await wordService.deleteWord(word.id);
      } catch (error) {
        console.log(error);
        alert("Something went wrong, try again.");
      }
    }
  };

  const onChange = (event) => {
    setOrder(event.target.value);
    setSubmitted(true);
  };

  return (
    <div className="flex justify-center">
      <div className="w-1/3 p-2 border-b border-gray-400 flex justify-between text-shadow-md">
        <div>{word.word}</div>
        <div className="flex gap-2">
          {newFilter && (
            <form onSubmit={onSubmit}>
              <input
                type="number"
                value={order}
                onBlur={onBlur}
                onChange={onChange}
                min="0"
                className="w-7 text-center bg-color1 text-white rounded"
              ></input>
            </form>
          )}
          <button
            onClick={onClickDelete}
            className="px-1 text-center bg-color1 text-white rounded text-xs"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default WordListItem;
