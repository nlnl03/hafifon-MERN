import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import React, { useEffect, useState } from "react";

import HomePage from "./pages/homePage/homePage";
import UserPage from "./pages/UsersPage/mainUserPage";
import StudyMeteriasPage from "./pages/studyMeterials/week&lessons";
import Navbar from "./components/mainNavbar/navbar";
import NotFound from "./pages/NotFoundPage";

const RouteLogger = () => {
  const location = useLocation();

  useEffect(() => {
    console.log("Current route is:", location.pathname);
  }, [location]);

  return null;
};

const App = () => {
  const [basePath, setBasePath] = useState("");
  const [userData, setUserData] = useState({ token: null, roles: [] });

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      setUserData({ token, roles: decoded.roles || [] }); // Ensure roles is always an array
    }

    const savedBasePath = localStorage.getItem("basePath") || "";
    setBasePath(savedBasePath);
  }, []);

  const isAuthenticated = !!userData.token; // Boolean if user is authenticated

  useEffect(() => {
    // Save basePath to local storage when it changes
    localStorage.setItem("basePath", basePath);
  }, [basePath]);

  const location = useLocation();
  const hideNavbarPaths = ["/", "/home", "/NotFound"];

  const shouldRenderNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {shouldRenderNavbar && <Navbar setUserData={setUserData} />}

      <RouteLogger />
      <Routes>
        <Route index element={<HomePage setBasePath={setBasePath} />} />
        <Route path="/home" element={<HomePage setBasePath={setBasePath} />} />
        <Route path={`/${basePath}/UserPage`} element={<UserPage />} />
        <Route
          path={`/${basePath}/studyMaterials`}
          element={
            isAuthenticated && userData.roles?.includes("admin") ? (
              <StudyMeteriasPage />
            ) : (
              <Navigate to="/unauthorized" />
            )
          }
        />
        <Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} />

        {/* //not found routes */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </>
  );
};

const MainApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default MainApp;
