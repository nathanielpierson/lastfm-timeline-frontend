import axios from "axios";
import { useState } from "react";
import { API_BASE_URL } from "./api";

export function UserTopAlbumsPage() {
  const [albumsSixMonth, setAlbumsSixMonth] = useState([]);
  const [albumsTwelveMonth, setAlbumsTwelveMonth] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const query = formData.get("query") || form[0].value;
    
    if (!query || query.trim() === "") {
      setError("Please enter a username");
      return;
    }
    
    setError(null);
    setLoading(true);
    setAlbumsSixMonth([]);
    setAlbumsTwelveMonth([]);
    
    axios
      .get(`${API_BASE_URL}/api/users/localalbumdata`, {
        params: {
          user: query,
          period: "6month",
          limit: 600,
        },
      })
      .then((response) => {
        const data = response.data?.data ?? response.data;
        setAlbumsSixMonth(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.code === 'ERR_NETWORK' 
          ? "Cannot connect to backend server. Make sure it's running on port 3000."
          : `Error: ${err.message}`);
        setLoading(false);
      });
      
    axios
      .get(`${API_BASE_URL}/api/users/localalbumdata`, {
        params: {
          user: query,
          period: "12month",
          limit: 600,
        },
      })
      .then((response) => {
        const data = response.data?.data ?? response.data;
        setAlbumsTwelveMonth(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (!error) {
          setError(err.code === 'ERR_NETWORK' 
            ? "Cannot connect to backend server. Make sure it's running on port 3000."
            : `Error: ${err.message}`);
        }
      });
  };
  // loop checking if albumsTwelveMonth has any of the same albums as albumsSixMonth
  var same = 0;
  var w = 0;
  while (w < albumsTwelveMonth.length) {
    var v = 0;
    while (v < albumsSixMonth.length) {
      if (
        albumsTwelveMonth[w].artist.name == albumsSixMonth[v].artist.name &&
        albumsTwelveMonth[w].name == albumsSixMonth[v].name
      ) {
        same += 1;
      }
      v++;
    }
    w++;
  }

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="mb-8 flex flex-col items-center gap-4">
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
      {/* <p>{albumsSixMonth[3].artist.name}</p> */}
      {(Array.isArray(albumsSixMonth) ? albumsSixMonth : []).map((album) => {
        const albumName = album.title ?? album.name;
        const imageSrc = album.image_url ?? album.image?.[1]?.["#text"];
        const playCount = album.play_count_total ?? album.playcount;
        const artistName = album.artist?.name ?? album.artist?.["#text"];
        return (
          <div key={album.id}>
            {imageSrc && <img src={imageSrc} alt="" />}
            <h3>
              {albumName} by {artistName}{" "}
              {playCount != null && `${playCount} plays`}
            </h3>
          </div>
        );
      })}
    </div>
  );
}
