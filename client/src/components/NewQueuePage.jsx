import { useState, useEffect, useContext } from "react";
import wordService from "../services/wordService";
import WordNewView from "./WordNewView";
import AddWord from "./AddWord";
import NoWords from "./NoWords";
import { SocketContext } from "../SocketProvider";

const New = () => {
  const [words, setWords] = useState([]);
  const [noWords, setNoWords] = useState(false);
  const [wordsUpdated, setWordsUpdated] = useState(false);
  const socket = useContext(SocketContext);

  useEffect(() => {
    const handleWordsUpdated = () => {
      setWordsUpdated((prevWordsUpdated) => !prevWordsUpdated);
    };
    socket.on("wordUpdated", handleWordsUpdated);
    socket.on("wordCreated", handleWordsUpdated);

    return () => {
      socket.off("wordUpdated", handleWordsUpdated);
      socket.off("wordCreated", handleWordsUpdated);
    };
  }, []);

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
  }, [wordsUpdated]);

  return (
    <div className="pt-28">
      {noWords && <NoWords message="No words added." />}
      <ul>
        {words &&
          words.map((word) => {
            return (
              <li key={word.id + word.newOrder}>
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
