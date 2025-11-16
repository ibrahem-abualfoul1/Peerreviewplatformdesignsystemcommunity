import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';

export default function UsersList() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const textClass = theme === 'dark' ? 'text-[#E8D5B7]' : 'text-[#2D1B0E]';
  const mutedClass = theme === 'dark' ? 'text-[#B8A593]' : 'text-[#6B5D50]';
  const inputBg = theme === 'dark' ? 'bg-[#3D2A1A] border-[#D4876F]/20' : 'bg-[#F5E6D3] border-[#8D1B3D]/10';
  const borderClass = theme === 'dark' ? 'border-[#3D2A1A]' : 'border-[#F5E6D3]';
  const btnHoverEdit = theme === 'dark' ? 'hover:bg-[#A52A4A]/10 text-[#D4A574]' : 'hover:bg-[#8D1B3D]/10 text-[#8D1B3D]';

  const users = [
    { id: 1, fullName: 'John Doe', username: 'johndoe', email: 'john@example.com', role: 'Administrator', status: 'active' },
    { id: 2, fullName: 'Jane Smith', username: 'janesmith', email: 'jane@example.com', role: 'Evaluator', status: 'active' },
    { id: 3, fullName: 'Ahmed Ali', username: 'ahmedali', email: 'ahmed@example.com', role: 'User', status: 'active' },
    { id: 4, fullName: 'Sarah Johnson', username: 'sarahj', email: 'sarah@example.com', role: 'Evaluator', status: 'inactive' },
    { id: 5, fullName: 'Mohammed Hassan', username: 'mhassan', email: 'mohammed@example.com', role: 'User', status: 'active' },
  ];

  const filteredUsers = users.filter(user => 
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className={`text-2xl ${textClass}`}>{t('usersList')}</h1>
        <Button onClick={() => navigate('/users/create')}>
          <Plus className="w-4 h-4 inline ltr:mr-2 rtl:ml-2" />
          {t('addUser')}
        </Button>
      </div>

      <GlassCard className="p-6">
        {/* Search Bar */}
        <div className="mb-6 relative">
          <Search className={`absolute ltr:left-4 rtl:right-4 top-1/2 -translate-y-1/2 w-5 h-5 ${mutedClass}`} />
          <input
            type="text"
            placeholder={t('search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full ltr:pl-12 rtl:pr-12 ltr:pr-4 rtl:pl-4 py-3 rounded-[18px] ${inputBg} border ${textClass} focus:outline-none focus:ring-2 focus:ring-[#8D1B3D] transition-all`}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${borderClass}`}>
                <th className={`text-left py-3 px-4 ${mutedClass} text-sm`}>ID</th>
                <th className={`text-left py-3 px-4 ${mutedClass} text-sm`}>{t('fullName')}</th>
                <th className={`text-left py-3 px-4 ${mutedClass} text-sm`}>{t('username')}</th>
                <th className={`text-left py-3 px-4 ${mutedClass} text-sm`}>{t('email')}</th>
                <th className={`text-left py-3 px-4 ${mutedClass} text-sm`}>{t('role')}</th>
                <th className={`text-left py-3 px-4 ${mutedClass} text-sm`}>{t('status')}</th>
                <th className={`text-left py-3 px-4 ${mutedClass} text-sm`}>{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className={`border-b ${borderClass}`}>
                  <td className={`py-3 px-4 ${textClass}`}>{user.id}</td>
                  <td className={`py-3 px-4 ${textClass}`}>{user.fullName}</td>
                  <td className={`py-3 px-4 ${mutedClass}`}>{user.username}</td>
                  <td className={`py-3 px-4 ${mutedClass}`}>{user.email}</td>
                  <td className={`py-3 px-4 ${textClass}`}>{user.role}</td>
                  <td className="py-3 px-4">
                    <Badge variant={user.status === 'active' ? 'success' : 'error'}>
                      {user.status === 'active' ? t('active') : t('inactive')}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/users/edit/${user.id}`)}
                        className={`p-2 rounded-full ${btnHoverEdit} transition-colors`}
                        title={t('edit')}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 rounded-full hover:bg-red-500/10 text-red-500 transition-colors"
                        title={t('delete')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}