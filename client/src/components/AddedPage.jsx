import { useEffect, useState, useRef, useCallback } from "react";
import WordView from "./WordView";
import AddWord from "./AddWord";
import NoWords from "./NoWords";
import useWordSearch from "./useWordSearch";
import SearchBox from "./SearchBox";

//using ContextAPI to have available the socket connection from any component
import { useContext } from "react";
import { SocketContext } from "../SocketProvider";

const Added = () => {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [wordsUpdated, setWordsUpdated] = useState(false);
  const [newFilter, setNewFilter] = useState(false);
  //getting the socket connection
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

  const { words, loading, hasMore, error, noWords } = useWordSearch(
    query,
    pageNumber,
    wordsUpdated,
    newFilter
  );

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
      {noWords === true && <NoWords message="No words added." />}
      <ul className="pt-16">
        {words &&
          words.map((word, index) => {
            if (words.length === index + 1) {
              return (
                <li key={index} ref={lastWordElementRef}>
                  <WordView word={word} newFilter={newFilter} />
                </li>
              );
            } else {
              return (
                <li key={index}>
                  <WordView word={word} newFilter={newFilter} />
                </li>
              );
            }
          })}
      </ul>
      <div className="flex justify-center">
        <div>{loading && "Loading..."}</div>
        <div>{error && "Error..."}</div>
      </div>
      <AddWord />
    </div>
  );
};

export default Added;
