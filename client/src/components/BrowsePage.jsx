import { useEffect, useState, useRef, useCallback } from "react";
import WordBrowseView from "./WordBrowseView";
import AddWord from "./AddWord";
import NoWords from "./NoWords";
import useWordSearch from "./useWordSearch";
import SearchBox from "./SearchBox";

//using ContextAPI to have available the socket connection from any component
import { useContext } from "react";
import { SocketContext } from "../SocketProvider";

const Browse = () => {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [wordsUpdated, setWordsUpdated] = useState(false);
  //getting the socket connection
  const socket = useContext(SocketContext);

  useEffect(() => {
    const handleWordsUpdated = () => {
      setWordsUpdated((prevWordsUpdated) => !prevWordsUpdated);
      setPageNumber(1);
    };
    socket.on("wordDeleted", handleWordsUpdated);
    socket.on("wordCreated", handleWordsUpdated);
    return () => {
      socket.off("wordDeleted", handleWordsUpdated);
      socket.off("wordCreated", handleWordsUpdated);
    };
  }, []);

  const { words, loading, hasMore, error, noWords } = useWordSearch(
    query,
    pageNumber,
    wordsUpdated
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

  return (
    <div className="pt-28">
      {noWords === false && (
        <SearchBox query={query} handleSearch={handleSearch} />
      )}
      {noWords === true && <NoWords message="No words added." />}
      <ul className="pt-16">
        {words &&
          words.map((word, index) => {
            if (words.length === index + 1) {
              return (
                <li key={index} ref={lastWordElementRef}>
                  <WordBrowseView word={word} />
                </li>
              );
            } else {
              return (
                <li key={index}>
                  <WordBrowseView word={word} />
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

export default Browse;
