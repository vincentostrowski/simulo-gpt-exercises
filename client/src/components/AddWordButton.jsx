import { useState, useEffect, useRef } from "react";
import wordService from "../services/wordService";

// Component that allows user to input new words to their account
const AddWordButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [word, setWord] = useState("");
  const ref = useRef(null);

  // Add mousedown listener to handle outside clicks
  // User can click outside of this component minimize it
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Minimize component if clicked outside
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Handle errors from wordService.createWords
  const handleErrors = (error, word) => {
    if (error.response && error.response.data.error) {
      switch (error.response.data.error) {
        case "Failed to get definition":
        case "You've already added this word":
          alert(error.response.data.error);
          break;
        default:
          alert(`Something went wrong while adding ${word}. Try again.`);
      }
    } else {
      alert(`Something went wrong while adding ${word}. Try again.`);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const tempWord = word;
    setWord("");
    setIsOpen(false);
    try {
      await wordService.createWord({ word });
    } catch (error) {
      handleErrors(error, word);
      setIsOpen(true);
      setWord(tempWord);
    }
  };

  return (
    <div
      className={`fixed bottom-4 right-4 w-16 h-16 bg-color1 rounded-full flex items-center cursor-pointer transition-all duration-200 ease-in-out ${
        isOpen ? "w-64" : ""
      }`}
      onClick={() => setIsOpen(true)}
      ref={ref}
    >
      <form onSubmit={handleSubmit}>
        <input
          className="bg-color1 text-white px-4 py-2 rounded-full w-full border-none outline-none"
          type="text"
          value={word}
          onChange={(e) => {
            setWord(e.target.value);
            setIsOpen(true);
          }}
          placeholder="Add word"
        />
      </form>
    </div>
  );
};

export default AddWordButton;
