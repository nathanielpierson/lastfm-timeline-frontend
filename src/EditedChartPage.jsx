import axios from "axios";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "./api";

const LOADING_MESSAGES = [
  "Judging your music taste…",
  "Removing that one canceled artist…",
  "Jamming out…",
  "Outlasting FM…",
  "Data brainstorming…",
  "Wondering why you listen to this one…",
  "Console.logging your bad choices…",
  "Acknowledging a banger…",
  "Enhancing search algorithm…",
  "Gathering album artwork…",
  "Sorting data…",
  "Generating sorting metrics…",
];

function pickRandomMessage() {
  return LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];
}

export function EditedChartPage() {
  const [topEditedAlbums, setTopEditedAlbums] = useState([]);
  const [sortedAlbums, setSortedAlbums] = useState([]);
  const [ascending, setAscending] = useState(false);
  const [sortField, setSortField] = useState("one_week"); // default sort field
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loading) {
      setLoadingMessage("");
      return;
    }
    setLoadingMessage(pickRandomMessage());
    const id = setInterval(() => {
      setLoadingMessage(pickRandomMessage());
    }, 3000);
    return () => clearInterval(id);
  }, [loading]);

  const sortAlbums = (albums, field, asc) => {
    return [...albums].toSorted((a, b) =>
      asc ? a[field] - b[field] : b[field] - a[field]
    );
  };

  const fetchAndSortAlbums = () => {
    return axios
      .get(`${API_BASE_URL}/api/users/localalbumdata/raw`)
      .then((response) => {
        setTopEditedAlbums(response.data);
        setSortedAlbums(sortAlbums(response.data, sortField, ascending));
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const username = (formData.get("query") || form[0].value || "").trim();

    if (!username) {
      setError("Please enter a Last.fm username");
      return;
    }

    setError(null);
    setLoading(true);
    setTopEditedAlbums([]);
    setSortedAlbums([]);

    axios
      .post(`${API_BASE_URL}/api/users/localalbumdata`, {
        username,
      })
      .then(() => fetchAndSortAlbums())
      .catch((err) => {
        console.error("Error generating chart data:", err);
        setError(
          err.code === "ERR_NETWORK"
            ? "Cannot connect to backend server. Make sure it's running on port 3000."
            : `Error: ${err.response?.data?.message || err.message}`
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSort = (field) => {
    if (field === sortField) {
      // same field → just toggle ascending
      setAscending((prev) => !prev);
      setSortedAlbums((prev) => sortAlbums(prev, field, !ascending));
    } else {
      // new field → reset to descending first
      setSortField(field);
      setAscending(false);
      setSortedAlbums(sortAlbums(topEditedAlbums, field, false));
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold mb-2">Album Plays Over Time</h1>
        <p className="text-gray-700">
          Search your Last.fm username to generate a chart of your album plays over time.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mb-8 flex flex-col items-center gap-4"
      >
        <div className="flex w-full max-w-md gap-2">
          <input
            name="query"
            type="text"
            placeholder="Enter Last.fm username..."
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base shadow-sm transition-all"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Generating..." : "Generate chart"}
          </button>
        </div>
        {error && (
          <div className="w-full max-w-md p-3 bg-red-100 border-2 border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        {loading && loadingMessage && (
          <p className="text-gray-600 italic text-center w-full max-w-md">
            {loadingMessage}
          </p>
        )}
      </form>

      <div className="flex flex-wrap justify-center gap-2 mb-4">
        <button
          type="button"
          onClick={() => handleSort("one_week")}
          className={`px-4 py-2 rounded-full font-medium shadow-md transition-all duration-75 select-none border-2 min-w-[3rem] ${
            sortField === "one_week"
              ? "bg-blue-600 text-white border-blue-700 shadow-inner active:scale-95 active:translate-y-0.5"
              : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 hover:border-gray-400 active:scale-95 active:translate-y-0.5 active:shadow-sm"
          }`}
        >
          1w
        </button>
        <button
          type="button"
          onClick={() => handleSort("one_month")}
          className={`px-4 py-2 rounded-full font-medium shadow-md transition-all duration-75 select-none border-2 min-w-[3rem] ${
            sortField === "one_month"
              ? "bg-blue-600 text-white border-blue-700 shadow-inner active:scale-95 active:translate-y-0.5"
              : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 hover:border-gray-400 active:scale-95 active:translate-y-0.5 active:shadow-sm"
          }`}
        >
          1m
        </button>
        <button
          type="button"
          onClick={() => handleSort("three_month")}
          className={`px-4 py-2 rounded-full font-medium shadow-md transition-all duration-75 select-none border-2 min-w-[3rem] ${
            sortField === "three_month"
              ? "bg-blue-600 text-white border-blue-700 shadow-inner active:scale-95 active:translate-y-0.5"
              : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 hover:border-gray-400 active:scale-95 active:translate-y-0.5 active:shadow-sm"
          }`}
        >
          3m
        </button>
        <button
          type="button"
          onClick={() => handleSort("six_month")}
          className={`px-4 py-2 rounded-full font-medium shadow-md transition-all duration-75 select-none border-2 min-w-[3rem] ${
            sortField === "six_month"
              ? "bg-blue-600 text-white border-blue-700 shadow-inner active:scale-95 active:translate-y-0.5"
              : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 hover:border-gray-400 active:scale-95 active:translate-y-0.5 active:shadow-sm"
          }`}
        >
          6m
        </button>
        <button
          type="button"
          onClick={() => handleSort("twelve_month")}
          className={`px-4 py-2 rounded-full font-medium shadow-md transition-all duration-75 select-none border-2 min-w-[3rem] ${
            sortField === "twelve_month"
              ? "bg-blue-600 text-white border-blue-700 shadow-inner active:scale-95 active:translate-y-0.5"
              : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 hover:border-gray-400 active:scale-95 active:translate-y-0.5 active:shadow-sm"
          }`}
        >
          1yr
        </button>
        <button
          type="button"
          onClick={() => handleSort("play_count_total")}
          className={`px-4 py-2 rounded-full font-medium shadow-md transition-all duration-75 select-none border-2 min-w-[3rem] ${
            sortField === "play_count_total"
              ? "bg-blue-600 text-white border-blue-700 shadow-inner active:scale-95 active:translate-y-0.5"
              : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 hover:border-gray-400 active:scale-95 active:translate-y-0.5 active:shadow-sm"
          }`}
        >
          all
        </button>
      </div>

      <p className="text-center">
        Currently sorting by <b>{sortField}</b>{" "}
        ({ascending ? "ascending" : "descending"})
      </p>

      {sortedAlbums.map((album) => (
        <div key={album.id} className="flex flex-row flex-wrap items-center gap-x-4 gap-y-2 border-2 p-4">
          <h2 className="truncate w-48 shrink-0">{album.title}</h2>
          {album.image_url && <img src={album.image_url} alt="" className="shrink-0" />}
          <p className="artist shrink-0">{album.artist.name}</p>
          {album.one_week !== 0 ? (
            <p className="filled shrink-0">one week: {album.one_week}</p>
          ) : (
            <p className="shrink-0">one week: no data</p>
          )}
          {album.one_month !== 0 ? (
            <p className="filled shrink-0">one month: {album.one_month}</p>
          ) : (
            <p className="shrink-0">one month: no data</p>
          )}
          {album.three_month !== 0 ? (
            <p className="filled shrink-0">three month: {album.three_month}</p>
          ) : (
            <p className="shrink-0">three month: no data</p>
          )}
          {album.six_month !== 0 ? (
            <p className="filled shrink-0">six month: {album.six_month}</p>
          ) : (
            <p className="shrink-0">six month: no data</p>
          )}
          {album.twelve_month !== 0 ? (
            <p className="filled shrink-0">one year: {album.twelve_month}</p>
          ) : (
            <p className="shrink-0">one year: no data</p>
          )}
          {album.play_count_total !== 0 ? (
            <p className="filled shrink-0">overall: {album.play_count_total}</p>
          ) : (
            <p className="shrink-0">overall: no data</p>
          )}
        </div>
      ))}
    </div>
  );
}
