import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/auth/Layout";
import LoginStudent from "./pages/auth/LoginStudent";
import RegisterStudent from "./pages/auth/RegisterStudent";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/auth/*" element={<Layout />}>
            <Route path="student/login" element={<LoginStudent />} />
            <Route path="student/register" element={<RegisterStudent />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
