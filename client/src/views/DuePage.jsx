import wordService from "../services/wordService";
import { useState, useEffect, useContext } from "react";
import AddWordButton from "../components/AddWordButton";
import EaseDisplay from "../components/EaseDisplay";
import QuestionList from "../components/QuestionList";
import DueWordDisplay from "../components/DueWordDisplay";
import DueWordDisplayController from "../components/DueWordDisplayController";
import DefinitionDisplay from "../components/DefinitionDisplay";
import NoWordsMessage from "../components/NoWordsMessage";
import { SocketContext } from "../contexts/SocketProvider";

const DuePage = () => {
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
      {noDue && <NoWordsMessage message="No words due." />}
      {word && questions && (
        <>
          <DueWordDisplay
            revealWord={revealWord}
            word={word}
            revealLetter={revealLetter}
            className=""
          />
          <QuestionList questions={questions} className="" />
          <DueWordDisplayController
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
            <EaseDisplay word={word} onEaseSelection={onEaseSelection} />
          )}
        </>
      )}
      <AddWordButton />
    </div>
  );
};

export default DuePage;
