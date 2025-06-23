import { useState, useEffect } from 'react'
import axios from 'axios'

export function TopTracksPage() {
  const [tracks, setTracks] = useState([]);
  const handleIndex = () => {
    axios.get("http://localhost:3000/top-tracks", {
      params: {
        artist: "Three Days Grace"
      }
    })
    .then((response) => {
      setTracks(response.data);
      console.log(response.data);
    }
  );
};
useEffect(handleIndex,[]);
 return (
  <div>
    {/* {tracks.toptracks.map((track) =>
 (
 <div key={track.id}>
  <h2>{track.name}</h2>
  </div>
  ))} */}
    <p>
      top tracks page
    </p>
  </div>
 ) 
}