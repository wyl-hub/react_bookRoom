import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import routes from "./router/index.jsx"
import { ContextProvider } from "./context/index.jsx"

export const router = createBrowserRouter(routes)
ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <RouterProvider router={router} />
  </ContextProvider>
)
