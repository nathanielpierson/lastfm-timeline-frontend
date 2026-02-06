import { useState } from "react";
import axios from "axios";

export function WeeklyChartPage() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const query = formData.get("query") || form[0].value;

    if (!query || query.trim() === "") {
      setError("Please enter a Last.fm username");
      return;
    }

    setError(null);
    setLoading(true);
    setAlbums([]);

    axios
      .get("http://localhost:3000/api/users/weeklychart", {
        params: {
          user: query,
        },
      })
      .then((response) => {
        setAlbums(response.data);
      })
      .catch((err) => {
        console.error("Error fetching weekly chart:", err);
        setError(
          err.code === "ERR_NETWORK"
            ? "Cannot connect to backend server. Make sure it's running on port 3000."
            : `Error: ${err.message}`
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="p-6">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold mb-2">Weekly Album Chart</h1>
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
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
        {error && (
          <div className="w-full max-w-md p-3 bg-red-100 border-2 border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
      </form>

      <div className="space-y-2">
        {albums.map((album) => (
          <div key={album.id} className="border rounded-md p-3 text-left">
            <h3 className="font-semibold">
              {album.name}{" "}
              <span className="text-gray-700">
                by {album.artist["#text"]}
              </span>
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}