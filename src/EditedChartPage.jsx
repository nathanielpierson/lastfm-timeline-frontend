import axios from "axios";
import { useState } from "react";

export function EditedChartPage() {
  const [topEditedAlbums, setTopEditedAlbums] = useState([]);
  const [sortedAlbums, setSortedAlbums] = useState([]);
  const [ascending, setAscending] = useState(false);
  const [sortField, setSortField] = useState("one_week"); // default sort field
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sortAlbums = (albums, field, asc) => {
    return [...albums].toSorted((a, b) =>
      asc ? a[field] - b[field] : b[field] - a[field]
    );
  };

  const fetchAndSortAlbums = () => {
    return axios
      .get("http://localhost:3000/api/users/localalbumdata/raw")
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
      .post("http://localhost:3000/api/users/localalbumdata", {
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
      </form>

      <div className="flex gap-2 mb-4">
        <button onClick={() => handleSort("one_week")}>1w</button>
        <button onClick={() => handleSort("one_month")}>1m</button>
        <button onClick={() => handleSort("three_month")}>3m</button>
        <button onClick={() => handleSort("six_month")}>6m</button>
        <button onClick={() => handleSort("twelve_month")}>1yr</button>
        <button onClick={() => handleSort("play_count_total")}>all</button>
      </div>

      <p>
        Currently sorting by <b>{sortField}</b>{" "}
        ({ascending ? "ascending" : "descending"})
      </p>

      {sortedAlbums.map((album) => (
        <div key={album.id} className="flex justify-start columns-1 border-2">
          <h2 className="truncate w-48">{album.title}</h2>
          {album.image_url && <img src={album.image_url} alt="" />}
          <p className="artist">{album.artist.name}</p>
          {album.one_week !== 0 ? (
            <p className="filled">one week: {album.one_week}</p>
          ) : (
            <p>one week: no data</p>
          )}
          {album.one_month !== 0 ? (
            <p className="filled">one month: {album.one_month}</p>
          ) : (
            <p>one month: no data</p>
          )}
          {album.three_month !== 0 ? (
            <p className="filled">three month: {album.three_month}</p>
          ) : (
            <p>three month: no data</p>
          )}
          {album.six_month !== 0 ? (
            <p className="filled">six month: {album.six_month}</p>
          ) : (
            <p>six month: no data</p>
          )}
          {album.twelve_month !== 0 ? (
            <p className="filled">one year: {album.twelve_month}</p>
          ) : (
            <p>one year: no data</p>
          )}
          {album.play_count_total !== 0 ? (
            <p className="filled">overall: {album.play_count_total}</p>
          ) : (
            <p>overall: no data</p>
          )}
        </div>
      ))}
    </div>
  );
}
