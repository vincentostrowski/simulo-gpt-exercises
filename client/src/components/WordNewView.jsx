import wordService from "../services/wordService";
import { useState } from "react";

const WordNewView = ({ word }) => {
  const [order, setOrder] = useState(word.newOrder);
  const [submitted, setSubmitted] = useState(false);

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

  const onChange = (event) => {
    setOrder(event.target.value);
    setSubmitted(true);
  };

  const onBlur = () => {
    if (!submitted) {
      setOrder(word.newOrder);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-1/3 p-2 flex justify-between border-b border-gray-200">
        <div>{word.word}</div>
        <div className>
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
        </div>
      </div>
    </div>
  );
};

export default WordNewView;
