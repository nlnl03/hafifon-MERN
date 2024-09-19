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

  useEffect(() => {
    const savedBasePath = localStorage.getItem("basePath") || "";
    setBasePath(savedBasePath);
  }, []);

  useEffect(() => {
    // Save basePath to local storage when it changes
    localStorage.setItem("basePath", basePath);
  }, [basePath]);

  const location = useLocation();
  const hideNavbarPaths = ["/", "/home", "/NotFound"];

  const shouldRenderNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {shouldRenderNavbar && <Navbar />}

      <RouteLogger />
      <Routes>
        <Route index element={<HomePage setBasePath={setBasePath} />} />
        <Route path="/home" element={<HomePage setBasePath={setBasePath} />} />
        <Route path={`/${basePath}/UserPage`} element={<UserPage />} />
        <Route path={`/studyMeterials`} element={<StudyMeteriasPage />} />

        {/* //not found routes */}
        <Route path={`/${basePath}/*`} element={<Navigate to="/NotFound" />} />
        <Route path="/NotFoundPage" element={<NotFound />} />
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
