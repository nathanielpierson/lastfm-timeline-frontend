import { useState, useEffect } from 'react'
import axios from 'axios'

export function WeeklyChartPage() {
  const [albums, setAlbums] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const query = (form[0].value);
    console.log(query);

      axios.get("http://localhost:3000/weekly-chart", {
        params: {
          user: query
        }
      })
      .then((response) => {
        setAlbums(response.data);
        // console.log(response.data);
      }
    );
  };
  // useEffect(handleSubmit,[]);
  return (
  <div>
    <p>
      <form onSubmit={handleSubmit}>
      <input name="query" />
      <button type="submit">Search</button>
    </form>
    </p>
  {albums.map((album) => (
    <div key={album.id}>
    <h3>{album.name} by {album.artist['#text']}</h3>
    </div>

  ))}
  </div>
)
}