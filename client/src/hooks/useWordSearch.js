import { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../config/firebase-config";
const baseUrl = `${import.meta.env.VITE_BASEURL}/api/words`;

// Custom Hook used to search for words
const useWordSearch = (query, pageNumber, wordsUpdated, newFilter) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [words, setWords] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [noWords, setNoWords] = useState(null);

  // Reset the search results when the query, wordsUpdated flag, or newFilter changes.
  useEffect(() => {
    setWords([]);
  }, [query, wordsUpdated, newFilter]);

  // Perform the search when the component mounts
  // or when the query, page number, or newFilter changes.
  useEffect(() => {
    let cancel;
    setError(false);
    setLoading(true);
    auth.currentUser.getIdToken().then((token) => {
      axios
        .get(`${baseUrl}/search`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { query, pageNumber, newFilter },
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        })
        .then((res) => {
          setWords((prevWords) => {
            return [...prevWords, ...res.data];
          });
          setHasMore(res.data.length > 0);
          setLoading(false);
          setNoWords(
            words.length === 0 && query === "" && res.data.length === 0
          );
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
          setError(true);
        });
    });

    return () => cancel && cancel();
  }, [query, pageNumber, wordsUpdated, newFilter]);

  return { loading, error, words, hasMore, noWords };
};

export default useWordSearch;
