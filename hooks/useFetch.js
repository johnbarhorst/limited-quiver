export const useFetch = uri => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();

  const handleRequest = data => {
    if (data.ok) return data.json();
    throw Error(data.statusText);
  }

  const handleErrors = e => {
    setError(e);
    return setLoading(false);
  }

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      if (!uri) return;
      fetch(uri)
        .then(handleRequest)
        .then(setData)
        .then(() => setLoading(false))
        .catch(handleErrors);
    }
    return () => isSubscribed = false;
  }, [uri]);

  return {
    loading,
    error,
    data,
  }
}