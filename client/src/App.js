import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/home";
import Navbar from "./Components/Layout/NavBar";
import Footer from "./Components/Layout/Footer";
import Post from "./Pages/post";
import SinglePost from "./Pages/singlePost";
import Login from "./Pages/login";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Home />
        </div>
      ),
    },
    {
      path: "/post",
      element: (
        <div>
          <Post/>
        </div>
      ),
    },
    {
      path: "/singlepost/:id",
      element: (
        <div>
         <SinglePost/>
        </div>
      ),
    },
    {
      path: "/login",
      element: (
        <div>
          <Login/>
        </div>
      ),
    },
    
  ]);

  return (
    <>
      <Navbar />
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}

export default App;
