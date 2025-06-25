import axios from "axios"

export function UserTopAlbumsPage() {
  const [albums, setAlbums] = useState([]);
axios.get("http://localhost:3000/usertopalbums").then((response) => { 
  setAlbums(response.data);
})
  return (
    <div>

    </div>
  )
}