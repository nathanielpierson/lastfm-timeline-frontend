import axios from "axios"
import { useState, useEffect } from 'react'


export function UserTopAlbumsPage() {
  const [albums, setAlbums] = useState([]);
    const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const query = (form[0].value);
    console.log(query);
    axios.get("http://localhost:3000/usertopalbums", {
      params: {
        user: query
      }
    }).then((response) => { 
      setAlbums(response.data);
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="query" />
        <button type="submit">Search</button>
      </form>
      {albums.map((album) => (
        <div key={album.id}>
          {/* <img src={album.image[1]['#text']} /> */}
          <h3>{album.name} <img src={album.image[1]['#text']} /> by {album.artist.name} {album.playcount} plays</h3>
        </div>
))};
    </div>
  )
}