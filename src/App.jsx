import BookData from "./Components/HomePage/BookData";
import "./App.css";
import Navbar from "./Navigation/Navbar";
import { useState } from "react";
import useBooks from "./hook/useBooks";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
// const Skeleton = React.lazy(() => import("react-loading-skeleton"));
const App = () => {
  return (
    <div className="App">
      <Navbar />

      <Outlet />
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
              color: "white",
            },
          },
          error: {
            style: {
              background: "red",
              color: "white",
            },
          },
        }}
      />
    </div>
  );
};

export default App;
