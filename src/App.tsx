import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/Dashboard';
import UsersList from './pages/UsersList';
import CreateUser from './pages/CreateUser';
import EditUser from './pages/EditUser';
import QuestionsList from './pages/QuestionsList';
import CreateQuestion from './pages/CreateQuestion';
import EditQuestion from './pages/EditQuestion';
import Assignments from './pages/Assignments';
import MyAnswers from './pages/MyAnswers';
import Survey from './pages/Survey';
import AnswerScoring from './pages/AnswerScoring';
import Lookups from './pages/Lookups';
import Settings from './pages/Settings';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="users" element={<UsersList />} />
                <Route path="users/create" element={<CreateUser />} />
                <Route path="users/edit/:id" element={<EditUser />} />
                <Route path="questions" element={<QuestionsList />} />
                <Route path="questions/create" element={<CreateQuestion />} />
                <Route path="questions/edit/:id" element={<EditQuestion />} />
                <Route path="assignments" element={<Assignments />} />
                <Route path="my-answers" element={<MyAnswers />} />
                <Route path="survey/:id" element={<Survey />} />
                <Route path="scoring" element={<AnswerScoring />} />
                <Route path="lookups" element={<Lookups />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              {/* Catch-all route for preview pages and unmatched routes */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}