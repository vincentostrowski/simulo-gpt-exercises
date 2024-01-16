import { useState, useEffect } from "react";
import wordService from "../services/wordService";
import WordBrowseView from "./WordBrowseView";
import AddWord from "./AddWord";

const Browse = () => {
  const [words, setWords] = useState([]);
  const [noWords, setNoWords] = useState(false);

  useEffect(() => {
    const getAllWords = async () => {
      try {
        const res = await wordService.getAll();
        if (res.data.length === 0) {
          setNoWords(true);
          return;
        }
        setWords(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllWords();
  }, []);

  return (
    <div className="pt-28">
      {noWords && (
        <div className="m-6 flex flex-col items-center">
          <div>No words.</div>
          <div>Click 'Add' on the bottom right to add to your vocabulary.</div>
        </div>
      )}
      <ul>
        {words &&
          words.map((word) => {
            return (
              <li key={word.id}>
                <WordBrowseView word={word} />
              </li>
            );
          })}
      </ul>
      <AddWord />
    </div>
  );
};

export default Browse;
