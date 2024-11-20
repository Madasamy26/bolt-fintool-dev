import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PersonalDetailsForm } from './PersonalDetailsForm';
import { WorkDetailsForm } from './WorkDetailsForm';
import { useNavStore } from '@/store/useNavStore';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import Sidebar from './Sidebar';
import TopNav from './TopNav';


// Component for displaying placeholder content
const PlaceholderContent = ({ navTitle }) => (
  <div className="text-center py-8">
    <h3 className="text-xl font-medium text-gray-800 mb-2">
      You selected: {navTitle}
    </h3>
    <p className="text-gray-600">
      This section is under development. Component will be added soon.
    </p>
  </div>
);

// Component mapping object
const CONTENT_COMPONENTS = {
  'Personal Info': () => <PersonalDetailsForm />,
};

export function MainContent() {
  const navigate = useNavigate();
  const selectedNav = useNavStore((state) => state.selectedNav);

  // For debugging
  console.log('Current selected nav:', selectedNav);

  const renderContent = () => {
    const Component = CONTENT_COMPONENTS[selectedNav];
    if (Component) {
      return <Component />;
    }
    return <PlaceholderContent navTitle={selectedNav} />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav title="Data Collection" />
      
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 p-8">
          <div className="max-w-[1300px] mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#0C7FDA]">{selectedNav}</h2>
              <Button 
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="shadow-sm"
              >
                Back to Dashboard
              </Button>
            </div>

            <Card>
              <CardContent className="pt-6">
                {renderContent()}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
