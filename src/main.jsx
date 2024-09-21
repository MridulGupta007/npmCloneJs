import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import SearchPackageList from "./Pages/SearchPackageList.jsx";
import PackageDetails from "./Pages/PackageDetails.jsx";
import HomeLayout from "./Pages/HomeLayout.jsx";
import PackageVersionDetails from "./Pages/PackageVersionDetails.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<HomeLayout />} />
      <Route path="/search" element={<SearchPackageList />} />
      <Route path="/package/:packageName" element={<PackageDetails />} />
      <Route
        path="package/:packageName/v/:version"
        element={<PackageVersionDetails />}
      />
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
