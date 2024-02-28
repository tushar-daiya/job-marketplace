import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/auth/Layout";
import LoginStudent from "./pages/auth/LoginStudent";
import RegisterStudent from "./pages/auth/RegisterStudent";
import RegisterCompany from "./pages/auth/RegisterCompany";
import LoginCompany from "./pages/auth/LoginCompany";
import { useGetMeQuery } from "./store/features/api/studentApiSlice";
import FullScreenLoader from "./components/ui/FullScreenLoader";
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

          <Route path="/student/*">
            <Route path="dashboard" element={<div>Student Dashboard</div>} />
            <Route path="profile" element={<div>Student Profile</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
