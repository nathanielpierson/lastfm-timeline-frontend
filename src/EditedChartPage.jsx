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
  {topEditedAlbums.map((album) => 
  (
<div key={album.id}>
  <h2>{album.title}</h2>
  <p>{album.artist.name}</p>
  {album.one_week != null ? <p> one week: {album.one_week} </p> : <p>one week: no data</p>
}
  {album.one_month != null ? <p> one month: {album.one_month} </p> : <p>one month: no data</p>
}
  {album.three_month != null ? <p> three month: {album.three_month} </p> : <p>three month: no data</p>
}
  {album.six_month != null ? <p> six month: {album.six_month} </p> : <p>six month: no data</p>
}
  {album.twelve_month != null ? <p> one year: {album.twelve_month} </p> : <p>one year: no data</p>
}
  {album.play_count_total != null ? <p> overall: {album.play_count_total} </p> : <p>overall: no data</p>
}
  </div>
  ))}
  h
</div>
  )
}