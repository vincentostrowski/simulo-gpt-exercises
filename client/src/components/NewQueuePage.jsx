import { useState, useEffect } from "react";
import wordService from "../services/wordService";
import WordNewView from "./WordNewView";
import AddWord from "./AddWord";

const New = () => {
  const [words, setWords] = useState([]);
  const [noWords, setNoWords] = useState(false);

  useEffect(() => {
    const getNewWords = async () => {
      try {
        const res = await wordService.getNewQueued();
        if (res.data.length === 0) {
          setNoWords(true);
          return;
        }
        setWords(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getNewWords();
  }, []);

  return (
    <div className="pt-28">
      {noWords && (
        <div className="m-6 flex flex-col items-center">
          <div>No new words.</div>
          <div>Click 'Add' on the bottom right to add to your vocabulary.</div>
        </div>
      )}
      <ul>
        {words &&
          words.map((word) => {
            return (
              <li key={word.id}>
                <WordNewView word={word} />
              </li>
            );
          })}
      </ul>
      <AddWord />
    </div>
  );
};

export default New;
