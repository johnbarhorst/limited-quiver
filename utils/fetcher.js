// Just fetch in a wrapper for use with swr.

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default fetcher;