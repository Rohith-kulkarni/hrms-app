import { Outlet, Navigate } from "react-router-dom";
import Layout from "../components/layouts/Layout";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  return token ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
