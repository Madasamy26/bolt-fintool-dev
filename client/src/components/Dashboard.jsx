import React from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import TopNav from './TopNav';

function DashboardCard({ title, description, onClick }) {
  return (
    <div 
      className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
      onClick={onClick}
    >
      <h3 className="font-medium text-lg mb-2 text-[#0C7FDA]">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

export function Dashboard() {
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const logoutFn = useAuthStore(state => state.logout);

  const handleLogout = () => {
    logoutFn();
    navigate('/login');
  };

  const handleProfileCreation = () => {
    navigate('/profile-creation');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav title="FIN-TOOL" />
      
      <div className="max-w-[1300px] mx-auto p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0C7FDA]">Dashboard</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            Welcome, {user.name}!
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <DashboardCard
              title="Profile Creation"
              description="Create and manage your detailed profile information"
              onClick={handleProfileCreation}
            />
            <DashboardCard
              title="Settings"
              description="Manage your account settings"
            />
            <DashboardCard
              title="Documents"
              description="View and manage your documents"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 