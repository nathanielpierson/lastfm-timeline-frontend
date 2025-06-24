import { useState, useEffect } from 'react'
import axios from 'axios'

export function WeeklyChartPage() {
  const [albums, setAlbums] = useState([]);
  const handleIndex = () => {
    axios.get("http://localhost:3000/weekly-chart", {
      params: {
        user: "Frogdunker"
      }
    })
    .then((response) => {
      setAlbums(response.data);
      console.log(response.data[69]);
    }
  );
};
useEffect(handleIndex,[]);
  return (
  <div>
  {albums.map((album) => (
    <div key={album.id}>
    <h3>{album.name} by {album.artist['#text']}</h3>
    </div>

  ))}
  </div>
)
}