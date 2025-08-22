import axios from "axios"
import { useState, useEffect } from "react";

export function EditedChartPage() {
  const [topEditedAlbums, setTopEditedAlbums] = useState([]);
  const handleIndex = () => {
    axios.get("http://localhost:3000/api/users/localalbumdata/raw").then((response) => {
      setTopEditedAlbums(response.data)
    })
  }
  useEffect (handleIndex, []);
  return (
<div>
  {topEditedAlbums.map((album) => 
  (
<div key={album.id} className="flex justify-start columns-1 border-2">
  <h2>{album.title}</h2>
  <img src={album.image_url} />
  <p className="artist">{album.artist.name}</p>
  {album.one_week != 0 ? <p className="filled"> one week: {album.one_week} </p> : <p> one week: no data </p>
  }
  {album.one_month != 0 ? <p className="filled"> one month: {album.one_month} </p> : <p> one month: no data </p>
  }
  {album.three_month != 0 ? <p className="filled"> three month: {album.three_month} </p> : <p> three month: no data </p>
  }
  {album.six_month != 0 ? <p className="filled"> six month: {album.six_month} </p> : <p> six month: no data </p>
  }
  {album.twelve_month != 0 ? <p className="filled"> one year: {album.twelve_month} </p> : <p> one year: no data </p>
  }
  {album.play_count_total != 0 ? <p className="filled"> overall: {album.play_count_total} </p> : <p> overall: no data </p>
  }
  </div>
  ))}
  h
</div>
  )
}