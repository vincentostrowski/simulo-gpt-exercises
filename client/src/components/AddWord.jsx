import { useState, useEffect, useRef } from "react";
import wordService from "../services/wordService";

const AddWord = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [word, setWord] = useState("");
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const tempWord = word;
    setWord("");
    setIsOpen(false);
    try {
      await wordService.createWord({ word });
    } catch (error) {
      if (
        error.response &&
        error.response.data.error === "Failed to get definition"
      ) {
        alert(error.response.data.error);
      } else {
        alert(`Something went wrong while adding ${word}. Try again.`);
      }
      setIsOpen(true);
      setWord(tempWord);
    }
  };

  return (
    <div
      ref={ref}
      className={`fixed bottom-4 right-4 w-16 h-16 bg-color1 rounded-full flex items-center cursor-pointer transition-all duration-200 ease-in-out ${
        isOpen ? "w-64" : ""
      }`}
      onClick={() => setIsOpen(true)}
    >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={word}
          onChange={(e) => {
            setWord(e.target.value);
            setIsOpen(true);
          }}
          className="bg-color1 text-white px-4 py-2 rounded-full w-full border-none outline-none"
          placeholder="Add word"
        />
      </form>
    </div>
  );
};

export default AddWord;
