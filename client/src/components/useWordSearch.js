import { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../config/firebase-config";
const baseUrl = `${import.meta.env.VITE_BASEURL}/api/words`;

const useWordSearch = (query, pageNumber) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [words, setWords] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setWords([]);
  }, [query]);

  useEffect(() => {
    let cancel;
    setError(false);
    setLoading(true);
    auth.currentUser.getIdToken().then((token) => {
      axios
        .get(`${baseUrl}/search`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { query, pageNumber },
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        })
        .then((res) => {
          setWords((prevWords) => {
            return [...prevWords, ...res.data];
          });
          setHasMore(res.data.length > 0);
          setLoading(false);
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
          setError(true);
        });
    });

    return () => cancel && cancel();
  }, [query, pageNumber]);

  return { loading, error, words, hasMore };
};

export default useWordSearch;
