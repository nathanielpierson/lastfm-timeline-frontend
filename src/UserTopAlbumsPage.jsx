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
        user: query, period: "6month"
      }
    }).then((response) => { 
      setAlbumsSixMonth(response.data);
    })
    axios.get("http://localhost:3000/usertopalbums", {
      params: {
        user: query, period: "12month"
      }
    }).then((response) => { 
      console.log(response.data[3].artist.name);
      setAlbumsTwelveMonth(response.data);
    })
  }
  var i = 0;
  console.log("test statement below")
  while (i < (albumsSixMonth.length)) {
    console.log(i+1);
    console.log(albumsSixMonth[i].artist.name);
    i++;
  }

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
          <p></p>
        </div>
))};
    </div>
  )
}