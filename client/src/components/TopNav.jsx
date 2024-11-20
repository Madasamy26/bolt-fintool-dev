import React from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

export default function TopNav({ title = 'Data Collection' }) {
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#0C7FDA] to-[#179BFF] bg-clip-text text-transparent">
              {title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="text-sm text-gray-600">Welcome,</div>
            <div className="font-medium">{user?.name}</div>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="ml-2"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}