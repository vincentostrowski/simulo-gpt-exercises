import { useState, useRef, useCallback } from "react";
import WordBrowseView from "./WordBrowseView";
import AddWord from "./AddWord";
import NoWords from "./NoWords";
import useWordSearch from "./useWordSearch";
import SearchBox from "./SearchBox";

const Browse = () => {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const { words, loading, hasMore, error, noWords } = useWordSearch(
    query,
    pageNumber
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
