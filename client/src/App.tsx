import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RoleIndicatorPage from "./features/auth/components/RoleIndicatorPage";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/student"
          element={
            <RoleIndicatorPage
              expectedRole="STUDENT"
              title="Student Dashboard"
            />
          }
        />
        <Route
          path="/faculty"
          element={
            <RoleIndicatorPage
              expectedRole="FACULTY"
              title="Faculty Dashboard"
            />
          }
        />
        <Route
          path="/ws"
          element={
            <RoleIndicatorPage expectedRole="WS" title="Admin Dashboard" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
