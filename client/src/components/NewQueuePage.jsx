import { useState, useEffect } from "react";
import wordService from "../services/wordService";
import WordNewView from "./WordNewView";
import AddWord from "./AddWord";

const New = () => {
  const [words, setWords] = useState([]);

  useEffect(() => {
    const getNewWords = async () => {
      try {
        const res = await wordService.getNewQueued();
        setWords(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getNewWords();
  }, []);

  return (
    <div className="pt-28">
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
