import { useState, useEffect } from 'react'
import axios from 'axios'

export function WeeklyChartPage() {
  const [artists, setArtists] = useState([]);
  const handleIndex = () => {
    axios.get("http://localhost:3000/weekly-chart", {
      params: {
        user: "Frogdunker"
      }
    })
    .then((response) => {
      setArtists(response.data);
      console.log(response.data[69]);
    }
  );
};
useEffect(handleIndex,[]);
  return (
  <div>
  {artists.map((artist) => (
    <div key={artist.id}>
    <h3>{artist.artist['#text']}</h3>
    </div>

  ))}
  </div>
)
}