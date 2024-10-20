import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BookList from "./Components/bookList/BookList.jsx";
import WhiteList from "./Components/whitelist/WhiteList.jsx";
import BookData from "./Components/HomePage/BookData.jsx";
import ErrorPage from "./Components/ErrorPage.jsx";
import BookDetails from "./Components/HomePage/BookDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <BookData />,
      },
      {
        path: "/bookList",
        element: <BookList />,
      },
      {
        path: "/whiteList",
        element: <WhiteList />,
      },
      {
        path: "details/:id",
        element: <BookDetails />,
        loader: async ({ params }) => {
          const response = await fetch(
            `https://gutendex.com/books/${params.id}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }

          const data = await response.json();
          return data; // Ensure you return the data from the loader
        },
      },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
