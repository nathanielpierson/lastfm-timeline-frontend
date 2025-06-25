import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Header } from './Header'
import { Footer } from './Footer'
import { ArtistsPage } from './ArtistsPage'
import { TopTracksPage } from './TopTracksPage'
import { WeeklyChartPage } from './WeeklyChartPage';
import { UserTopAlbumsPage } from './UserTopAlbumsPage';

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
        path: "/toptracks",
        element: <TopTracksPage />,
      },
      {
        path: "/artists",
        element: <ArtistsPage />,
      },
      {
        path: "/weeklychart",
        element: <WeeklyChartPage />
      },
      {

        path: "/usertopalbums",
        element: <UserTopAlbumsPage />
      }
    ],
  },
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
