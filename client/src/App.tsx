import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RoleIndicatorPage from "./features/auth/components/RoleIndicatorPage";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import StudentShell from "./features/student/components/StudentShell";
import StudentDashboardPage from "./features/student/pages/StudentDashboardPage";
import StudentHistoryPage from "./features/student/pages/StudentHistoryPage";
import StudentProfilePage from "./features/student/pages/StudentProfilePage";
import StudentReservationPage from "./features/student/pages/StudentReservationPage";
import StudentRulesPage from "./features/student/pages/StudentRulesPage";
import WsShell from "./features/ws/components/WsShell";
import WsDashboardPage from "./features/ws/pages/WsDashboardPage";
import WsRecordsPage from "./features/ws/pages/WsRecordsPage";
import WsSitInPage from "./features/ws/pages/WsSitInPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/student" element={<StudentShell />}>
          <Route index element={<StudentDashboardPage />} />
          <Route path="profile" element={<StudentProfilePage />} />
          <Route path="reservation" element={<StudentReservationPage />} />
          <Route path="history" element={<StudentHistoryPage />} />
          <Route path="rules" element={<StudentRulesPage />} />
        </Route>
        <Route
          path="/faculty"
          element={
            <RoleIndicatorPage
              expectedRole="FACULTY"
              title="Faculty Dashboard"
            />
          }
        />
        <Route path="/ws" element={<WsShell />}>
          <Route index element={<WsDashboardPage />} />
          <Route path="sitin" element={<WsSitInPage />} />
          <Route path="sitin/:idNumber" element={<WsSitInPage />} />
          <Route path="records" element={<WsRecordsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
