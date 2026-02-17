import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { TopTracksPage } from "./TopTracksPage";
import { EditedChartPage } from "./EditedChartPage";
import { UserTopAlbumsPage } from "./UserTopAlbumsPage";
import { HomePage } from "./HomePage";

const router = createBrowserRouter([
  {
    element: (
      <div>
        <Header />
        <Outlet />
        <br></br>
        <Footer />
      </div>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        // gives a short list of the top tracks on all of last.fm
        path: "/toptracks",
        element: <TopTracksPage />,
      },
      {
        // works?
        path: "/usertopalbums",
        element: <UserTopAlbumsPage />,
      },
      {
        // charty chart chart
        path: "/editedchart",
        element: <EditedChartPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
