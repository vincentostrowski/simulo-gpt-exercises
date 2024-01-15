import { useState, useEffect } from "react";
import wordService from "../services/wordService";
import WordBrowseView from "./WordBrowseView";
import AddWord from "./AddWord";

const Browse = () => {
  const [words, setWords] = useState([]);

  useEffect(() => {
    const getAllWords = async () => {
      try {
        const res = await wordService.getAll();
        setWords(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllWords();
  }, []);

  return (
    <div className="pt-28">
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
