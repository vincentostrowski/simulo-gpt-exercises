import { useEffect, useState, useRef, useCallback, useContext } from "react";
import WordListItem from "../components/WordListItem";
import AddWordButton from "../components/AddWordButton";
import NoWordsMessage from "../components/NoWordsMessage";
import useWordSearch from "../hooks/useWordSearch";
import SearchBox from "../components/SearchBox";
import { SocketContext } from "../contexts/SocketProvider";

// View component for the words that a user has added to their account
const AddedPage = () => {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [wordsUpdated, setWordsUpdated] = useState(false);
  const [newFilter, setNewFilter] = useState(false);
  const socket = useContext(SocketContext);

  useEffect(() => {
    const handleWordsUpdated = () => {
      setWordsUpdated((prevWordsUpdated) => !prevWordsUpdated);
      setPageNumber(1);
    };
    socket.on("wordDeleted", handleWordsUpdated);
    socket.on("wordCreated", handleWordsUpdated);
    socket.on("wordUpdated", handleWordsUpdated);
    return () => {
      socket.off("wordDeleted", handleWordsUpdated);
      socket.off("wordCreated", handleWordsUpdated);
      socket.off("wordUpdated", handleWordsUpdated);
    };
  }, []);

  // Custom hook used for search functionality
  const { words, loading, hasMore, error, noWords } = useWordSearch(
    query,
    pageNumber,
    wordsUpdated,
    newFilter
  );

  // Infinite Scroll implementation
  const observer = useRef();
  const lastWordElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setPageNumber(1);
  };

  const handleNewToggle = () => {
    setNewFilter((prevFilter) => !prevFilter);
    setPageNumber(1);
  };

  return (
    <div className="pt-28">
      {noWords === false && (
        <SearchBox
          query={query}
          handleSearch={handleSearch}
          handleNewToggle={handleNewToggle}
          newFilter={newFilter}
        />
      )}
      {noWords === true && <NoWordsMessage message="No words added." />}
      <ul className="pt-16">
        {words &&
          words.map((word, index) => {
            if (words.length === index + 1) {
              return (
                <li key={index} ref={lastWordElementRef}>
                  <WordListItem word={word} newFilter={newFilter} />
                </li>
              );
            } else {
              return (
                <li key={index}>
                  <WordListItem word={word} newFilter={newFilter} />
                </li>
              );
            }
          })}
      </ul>
      <div className="flex justify-center">
        <div>{loading && "Loading..."}</div>
        <div>{error && "Error..."}</div>
      </div>
      <AddWordButton />
    </div>
  );
};

export default AddedPage;
