import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useTheme } from '../contexts/ThemeContext';

export default function DashboardLayout() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#1A0F0A]' : 'bg-[#FFF9F0]'}`}>
      <Sidebar />
      <div className="ltr:ml-64 rtl:mr-64">
        <Header />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}