import axios from "axios"
import { useState, useEffect } from "react";

export function EditedChartPage() {
  const [topEditedAlbums, setTopEditedAlbums] = useState([]);
  const handleIndex = () => {
    axios.get("http://localhost:3000/top-albums-backend.json").then((response) => {
      setTopEditedAlbums(response.data)
      console.log("consolidated data from rails")
      console.log(response.data)
    })
  }
  useEffect (handleIndex, []);
  return (
<div>
  h
</div>
  )
}