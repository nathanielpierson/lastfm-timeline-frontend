import axios from "axios";
import { useState, useEffect } from "react";

export function UserTopAlbumsPage() {
  const [albumsSixMonth, setAlbumsSixMonth] = useState([]);
  const [albumsTwelveMonth, setAlbumsTwelveMonth] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const query = formData.get("query") || form[0].value;
    console.log(query);
    axios
      .get("http://localhost:3000/top-albums.json", {
        params: {
          user: query,
          period: "6month",
          limit: 600,
        },
      })
      .then((response) => {
        setAlbumsSixMonth(response.data);
      });
    axios
      .get("http://localhost:3000/top-albums.json", {
        params: {
          user: query,
          period: "12month",
          limit: 600,
        },
      })
      .then((response) => {
        console.log(response.data[3].artist.name);
        setAlbumsTwelveMonth(response.data);
      });
  };
  // loop checking if albumsTwelveMonth has any of the same albums as albumsSixMonth
  var same = 0;
  var w = 0;
  while (w < albumsTwelveMonth.length) {
    var v = 0;
    while (v < albumsSixMonth.length) {
      console.log(albumsSixMonth[v].artist.name);
      if (
        albumsTwelveMonth[w].artist.name == albumsSixMonth[v].artist.name &&
        albumsTwelveMonth[w].name == albumsSixMonth[v].name
      ) {
        console.log("same");
        same += 1;
      }
      v++;
    }
    w++;
  }
  console.log(`${same} number of same albums`);

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="mb-8 flex flex-col items-center gap-4">
        <div className="flex w-full max-w-md gap-2">
          <input 
            name="query" 
            type="text"
            placeholder="Enter Last.fm username..."
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base shadow-sm transition-all"
          />
          <button 
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Search
          </button>
        </div>
      </form>
      {/* <p>{albumsSixMonth[3].artist.name}</p> */}
      {albumsSixMonth.map((album) => (
        <div key={album.id}>
          {/* <img src={album.image[1]['#text']} /> */}
          <h3>
            {album.name} <img src={album.image[1]["#text"]} /> by{" "}
            {album.artist.name} {album.playcount} plays
          </h3>
        </div>
      ))}
    </div>
  );
}
