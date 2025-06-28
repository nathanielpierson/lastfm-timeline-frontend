import axios from "axios"
import { useState, useEffect } from 'react'


export function UserTopAlbumsPage() {
  const [albumsSixMonth, setAlbumsSixMonth] = useState([]);
  const [albumsTwelveMonth, setAlbumsTwelveMonth] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const query = (form[0].value);
    console.log(query);
    axios.get("http://localhost:3000/usertopalbums", {
      params: {
        user: query, period: "6month", limit: 100
      }
    }).then((response) => { 
      setAlbumsSixMonth(response.data);
    })
    axios.get("http://localhost:3000/usertopalbums", {
      params: {
        user: query, period: "12month", limit: 100
      }
    }).then((response) => { 
      console.log(response.data[3].artist.name);
      setAlbumsTwelveMonth(response.data);
    })
  }
  console.log("test statement below")
  // loop checking if albumsTwelveMonth has any of the same albums as albumsSixMonth
  var same = 0;
  var w = 0;
  while (w < albumsTwelveMonth.length) {
    var v = 0;
    while (v < (albumsSixMonth.length)) {
      console.log(albumsSixMonth[v].artist.name);
      if (albumsTwelveMonth[w].artist.name == albumsSixMonth[v].artist.name && albumsTwelveMonth[w].name == albumsSixMonth[v].name){
        console.log("same");
        same += 1;
      }
      v++;
    }
    w++;
  }
  console.log(`${same} number of same albums`)

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="query" />
        <button type="submit">Search</button>
      </form>
      {/* <p>{albumsSixMonth[3].artist.name}</p> */}
      {albumsSixMonth.map((album) => (
        <div key={album.id}>
          {/* <img src={album.image[1]['#text']} /> */}
          <h3>{album.name} <img src={album.image[1]['#text']} /> by {album.artist.name} {album.playcount} plays</h3>
        </div>
))};
    </div>
  )
}