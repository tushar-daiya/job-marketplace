import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Layout from "./pages/auth/Layout";
import LoginStudent from "./pages/auth/LoginStudent";
import RegisterStudent from "./pages/auth/RegisterStudent";
import RegisterCompany from "./pages/auth/RegisterCompany";
import LoginCompany from "./pages/auth/LoginCompany";
import { useGetMeQuery } from "./store/features/api/authApiSlice.js";
import FullScreenLoader from "./components/ui/FullScreenLoader";
import Dashboard from "./pages/company/Dashboard.jsx";
function App() {
  const { isError, isLoading, data: me, error } = useGetMeQuery();
  if (isLoading) return <FullScreenLoader />;
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/auth/*"
            element={
              me ? (
                me.type === "student" ? (
                  <Navigate to={"/student/dashboard"} />
                ) : (
                  <Navigate to={"/company/dashboard"} />
                )
              ) : (
                <Layout />
              )
            }
          >
            <Route path="student/login" element={<LoginStudent />} />
            <Route path="student/register" element={<RegisterStudent />} />
            <Route path="company/login" element={<LoginCompany />} />
            <Route path="company/register" element={<RegisterCompany />} />
          </Route>

          <Route
            path="/student/*"
            element={
              me ? (
                me.type == "student" ? (
                  <Outlet />
                ) : (
                  <Navigate to={"/company/dashboard"} />
                )
              ) : (
                <Navigate to={"/auth/student/login"} />
              )
            }
          >
            <Route path="dashboard" element={<div>Student Dashboard</div>} />
            <Route path="profile" element={<div>Student Profile</div>} />
          </Route>
          <Route
            path="/company/*"
            element={
              me ? (
                me.type == "company" ? (
                  <Outlet />
                ) : (
                  <Navigate to={"/student/dashboard"} />
                )
              ) : (
                <Navigate to={"/auth/company/login"} />
              )
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<div>Company Profile</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
