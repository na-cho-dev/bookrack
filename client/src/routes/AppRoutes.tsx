import { Routes, Route } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SelectOrganization from "../pages/SelectOrganization";
import UserProfile from "../pages/UserProfile";
import {
  ProtectedRouteWithOrg,
  ProtectedRouteWithoutOrg,
} from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      <Route
        path="/select-org"
        element={
          <ProtectedRouteWithoutOrg>
            <SelectOrganization />
          </ProtectedRouteWithoutOrg>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRouteWithOrg>
            <UserProfile />
          </ProtectedRouteWithOrg>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
