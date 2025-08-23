import axios from "axios";
import { useState, useEffect } from "react";

export function EditedChartPage() {
  const [topEditedAlbums, setTopEditedAlbums] = useState([]);
  const [sortedAlbums, setSortedAlbums] = useState([]);
  const [ascending, setAscending] = useState(false);
  const [sortField, setSortField] = useState("one_week"); // default sort field

  const sortAlbums = (albums, field, asc) => {
    return [...albums].toSorted((a, b) =>
      asc ? a[field] - b[field] : b[field] - a[field]
    );
  };

  const handleIndex = () => {
    axios
      .get("http://localhost:3000/api/users/localalbumdata/raw")
      .then((response) => {
        setTopEditedAlbums(response.data);
        setSortedAlbums(sortAlbums(response.data, sortField, ascending));
      });
  };

  const handleSort = (field) => {
    if (field === sortField) {
      // same field → just toggle ascending
      setAscending((prev) => !prev);
      setSortedAlbums((prev) =>
        sortAlbums(prev, field, !ascending)
      );
    } else {
      // new field → reset to descending first
      setSortField(field);
      setAscending(false);
      setSortedAlbums(sortAlbums(topEditedAlbums, field, false));
    }
  };

  useEffect(handleIndex, []);

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button onClick={() => handleSort("one_week")}>1w</button>
        <button onClick={() => handleSort("one_month")}>1m</button>
        <button onClick={() => handleSort("three_month")}>3m</button>
        <button onClick={() => handleSort("six_month")}>6m</button>
        <button onClick={() => handleSort("twelve_month")}>1yr</button>
        <button onClick={() => handleSort("play_count_total")}>all</button>
      </div>

      <p>
        Currently sorting by <b>{sortField}</b>{" "}
        ({ascending ? "ascending" : "descending"})
      </p>

      {sortedAlbums.map((album) => (
        <div key={album.id} className="flex justify-start columns-1 border-2">
          <h2 className="truncate w-48">{album.title}</h2>
          <img src={album.image_url} />
          <p className="artist">{album.artist.name}</p>
          {album.one_week !== 0 ? (
            <p className="filled">one week: {album.one_week}</p>
          ) : (
            <p>one week: no data</p>
          )}
          {album.one_month !== 0 ? (
            <p className="filled">one month: {album.one_month}</p>
          ) : (
            <p>one month: no data</p>
          )}
          {album.three_month !== 0 ? (
            <p className="filled">three month: {album.three_month}</p>
          ) : (
            <p>three month: no data</p>
          )}
          {album.six_month !== 0 ? (
            <p className="filled">six month: {album.six_month}</p>
          ) : (
            <p>six month: no data</p>
          )}
          {album.twelve_month !== 0 ? (
            <p className="filled">one year: {album.twelve_month}</p>
          ) : (
            <p>one year: no data</p>
          )}
          {album.play_count_total !== 0 ? (
            <p className="filled">overall: {album.play_count_total}</p>
          ) : (
            <p>overall: no data</p>
          )}
        </div>
      ))}
    </div>
  );
}
