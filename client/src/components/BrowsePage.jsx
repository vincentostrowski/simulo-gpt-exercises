import { useEffect, useState, useRef, useCallback } from "react";
import AddWord from "./AddWord";
import PackView from "./PackView";
import packService from "../services/packService";
/* import useWordSearch from "./useWordSearch"; */

/* import { useContext } from "react";
import { SocketContext } from "../SocketProvider"; */

const Browse = () => {
  const [packs, setPacks] = useState([]);
  //getting the socket connection
  /* const socket = useContext(SocketContext); */

  /*   useEffect(() => {
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
  }, []); */

  useEffect(() => {
    const getPacks = async () => {
      const response = await packService.getAll();
      setPacks(response.data);
    };
    getPacks();
  }, []);
  /*   const { words, loading, hasMore, error, noWords } = useWordSearch(
    query,
    pageNumber,
    wordsUpdated,
    newFilter
  );
 */
  /*  const observer = useRef();
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
  }; */

  return (
    <div className="h-screen p-6">
      <ul className="w-full pt-28 flex justify-center gap-6">
        {packs.length > 0 &&
          packs.map((pack, index) => {
            if (packs.length === index + 1) {
              return (
                <li
                  key={index}
                  /* ref={lastWordElementRef} */
                >
                  <PackView pack={pack} />
                </li>
              );
            } else {
              return (
                <li key={index}>
                  <PackView pack={pack} />
                </li>
              );
            }
          })}
      </ul>
      {/* <div className="flex justify-center">
        <div>{loading && "Loading..."}</div>
        <div>{error && "Error..."}</div>
      </div> */}
      <AddWord />
    </div>
  );
};

export default Browse;
