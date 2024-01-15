import wordService from "../services/wordService";
import { useState, useEffect } from "react";
import AddWord from "./AddWord";
import Ease from "./Ease";
import QuestionList from "./QuestionList";
import WordDisplay from "./WordDisplay";
import WordDisplayController from "./WordDisplayController";
import DefinitionDisplay from "./DefinitionDisplay";

const Due = () => {
  const [word, setWord] = useState("");
  const [questions, setQuestions] = useState([]);
  const [revealLetter, setRevealLetter] = useState("");
  const [revealWord, setRevealWord] = useState(false);
  const [revealDefinition, setRevealDefinition] = useState(false);
  const [cardToggle, setCardToggle] = useState(false);

  useEffect(() => {
    const getDue = async () => {
      const result = await wordService.getDue();
      if (!result.data) {
        return;
      }
      setWord(result.data.word);
      setQuestions(result.data.questions);
    };

    getDue();
  }, [cardToggle]);

  const onEaseSelection = () => {
    setRevealWord(false);
    setRevealLetter("");
    setWord(null);
    setQuestions(null);
    setCardToggle(!cardToggle);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 pt-28">
      {!(word && questions) ? (
        <div className="m-6 flex flex-col items-center">
          <div>No cards due.</div>
          <div>Click 'Add' on the bottom right to add to your vocabulary.</div>
        </div>
      ) : (
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
