import wordService from "../services/wordService";
import { useState, useEffect, useContext } from "react";
import AddWord from "./AddWord";
import Ease from "./Ease";
import QuestionList from "./QuestionList";
import WordDisplay from "./WordDisplay";
import WordDisplayController from "./WordDisplayController";
import DefinitionDisplay from "./DefinitionDisplay";
import NoWords from "./NoWords";
import { SocketContext } from "../SocketProvider";

const Due = () => {
  const [word, setWord] = useState("");
  const [questions, setQuestions] = useState([]);
  const [definitions, setDefinitions] = useState([]);
  const [revealLetter, setRevealLetter] = useState("");
  const [revealWord, setRevealWord] = useState(false);
  const [revealDefinition, setRevealDefinition] = useState(false);
  const [cardToggle, setCardToggle] = useState(false);
  const [noDue, setNoDue] = useState(false);
  const [cardCreated, setCardCreated] = useState(false);
  const socket = useContext(SocketContext);

  useEffect(() => {
    const handleCardCreated = () => {
      setCardCreated((prevWordCreated) => !prevWordCreated);
      setNoDue(false);
    };
    socket.on("wordCreated", handleCardCreated);

    return () => {
      socket.off("wordCreated", handleCardCreated);
    };
  }, []);

  useEffect(() => {
    const getDue = async () => {
      const result = await wordService.getDue();
      if (!result.data) {
        setNoDue(true);
        return;
      }
      setWord(result.data.word);
      setQuestions(result.data.questions);
      setDefinitions(result.data.definitions);
    };

    getDue();
  }, [cardToggle, cardCreated]);

  const onEaseSelection = () => {
    setRevealWord(false);
    setRevealLetter("");
    setRevealDefinition(false);
    setWord(null);
    setQuestions(null);
    setCardToggle(!cardToggle);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 pt-28">
      {noDue && <NoWords message="No words due." />}
      {word && questions && (
        <>
          <WordDisplay
            revealWord={revealWord}
            word={word}
            revealLetter={revealLetter}
            className=""
          />
          <QuestionList questions={questions} className="" />
          <WordDisplayController
            setRevealWord={setRevealWord}
            setRevealLetter={setRevealLetter}
            word={word}
            revealWord={revealWord}
            className=""
          />
          {revealWord && word && (
            <DefinitionDisplay
              setRevealDefinition={setRevealDefinition}
              revealDefinition={revealDefinition}
              definitions={definitions}
            />
          )}
          {revealWord && word && revealDefinition && (
            <Ease word={word} onEaseSelection={onEaseSelection} />
          )}
        </>
      )}
      <AddWord />
    </div>
  );
};

export default Due;
