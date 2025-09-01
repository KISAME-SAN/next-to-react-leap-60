import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import AppLayout from "./layouts/AppLayout";
import PublicLayout from "./layouts/PublicLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import StudentRegistration from "./pages/StudentRegistration";
import StudentManagement from "./pages/StudentManagement";
import TeacherRegistration from "./pages/TeacherRegistration";
import TeacherManagement from "./pages/TeacherManagement";
import GradesManagement from "./pages/GradesManagement";
import Payments from "./pages/Payments";
import ScheduleManagement from "./pages/ScheduleManagement";
import ClassManagement from "./pages/ClassManagement";
import NotFound from "./pages/NotFound";
// Payments sub-pages
import StudentsHome from "./pages/payments/StudentsHome";
import StudentsConfiguration from "./pages/payments/StudentsConfiguration";
import StudentsTracking from "./pages/payments/StudentsTracking";
import StudentsFees from "./pages/payments/StudentsFees";
import StudentsServices from "./pages/payments/StudentsServices";
import TeachersPayments from "./pages/payments/TeachersPayments";
import GradesAverages from "./pages/GradesAverages";
import Attendance from "./pages/Attendance";
import StudentsAttendanceWizard from "./pages/attendance/StudentsAttendanceWizard";
import TeachersAttendanceWizard from "./pages/attendance/TeachersAttendanceWizard";
import StudentsPay from "./pages/payments/StudentsPay";
import StudentsFeesManage from "./pages/payments/StudentsFeesManage";
import StudentsServicesManage from "./pages/payments/StudentsServicesManage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Routes publiques */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* Routes protégées */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="students/register" element={<StudentRegistration />} />
              <Route path="students" element={<StudentManagement />} />
              <Route path="teachers/register" element={<TeacherRegistration />} />
              <Route path="teachers" element={<TeacherManagement />} />
              <Route path="classes" element={<ClassManagement />} />
              <Route path="grades" element={<GradesManagement />} />
              <Route path="grades/averages" element={<GradesAverages />} />
              <Route path="schedule" element={<ScheduleManagement />} />
              <Route path="payments" element={<Payments />} />
              <Route path="payments/students" element={<StudentsHome />} />
              <Route path="payments/students/configuration" element={<StudentsConfiguration />} />
              <Route path="payments/students/tracking" element={<StudentsTracking />} />
              <Route path="payments/students/pay" element={<StudentsPay />} />
              <Route path="payments/students/fees" element={<StudentsFees />} />
              <Route path="payments/students/fees/manage" element={<StudentsFeesManage />} />
              <Route path="payments/students/services" element={<StudentsServices />} />
              <Route path="payments/students/services/manage" element={<StudentsServicesManage />} />
              <Route path="payments/teachers" element={<TeachersPayments />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="attendance/students" element={<StudentsAttendanceWizard />} />
              <Route path="attendance/teachers" element={<TeachersAttendanceWizard />} />
            </Route>

            {/* Route 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
