import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import { ArtistsPage } from './ArtistsPage'
import { TopTracksPage } from './TopTracksPage'

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    axios.get("http://localhost:3000")
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);


  return (
    <div>
      <p>
        <ArtistsPage />
        <TopTracksPage />
        test
      </p>
    </div>
  )
}

export default App
