import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Navbar from "./components/NavBar";
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import Home from "./components/HomeComponent.js";
import Accounts from "./components/AccountComponent";
import Session from "./components/SessionComponent";
import SearchUser from "./components/SearchUserComponent";
import Contact from "./components/ContactComponent";

const AppLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "accounts",
        element: <Accounts />
      },
      {
        path: "session",
        element: <Session />
      },
      {
        path: "user-search",
        element: <SearchUser />
      },
      {
        path: "contactus",
        element: <Contact />
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
