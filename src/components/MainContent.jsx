import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { PersonalDetailsForm } from './PersonalDetailsForm'
import { WorkDetailsForm } from './WorkDetailsForm'

const MainContent = ({ selectedNav }) => {
  if (selectedNav === 'Personal Info') {
    return (
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-[1300px] mx-auto">
          <h2 className="text-2xl font-bold text-[#0C7FDA] mb-4">{selectedNav}</h2>
          <Card>
            <CardContent className="pt-6">
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-[400px] grid-cols-2 gap-2 mb-4 p-1 bg-gray-100 rounded-lg">
                  <TabsTrigger 
                    value="personal"
                    className="px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out
                    data-[state=active]:bg-[#0C7FDA] data-[state=active]:text-white data-[state=active]:shadow-md
                    data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-600
                    rounded-md hover:bg-[#0C7FDA] hover:text-white"
                  >
                    Personal
                  </TabsTrigger>
                  <TabsTrigger 
                    value="work"
                    className="px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out
                    data-[state=active]:bg-[#0C7FDA] data-[state=active]:text-white data-[state=active]:shadow-md
                    data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-600
                    rounded-md hover:bg-[#0C7FDA] hover:text-white"
                  >
                    Work
                  </TabsTrigger>
                </TabsList>
                <div className="relative overflow-hidden">
                  <TabsContent 
                    value="personal"
                    className="data-[state=inactive]:absolute top-0 left-0 w-full transition-transform duration-300 ease-in-out data-[state=inactive]:translate-x-full data-[state=active]:translate-x-0"
                  >
                    <PersonalDetailsForm />
                  </TabsContent>
                  <TabsContent 
                    value="work"
                    className="data-[state=inactive]:absolute top-0 left-0 w-full transition-transform duration-300 ease-in-out data-[state=inactive]:translate-x-full data-[state=active]:translate-x-0"
                  >
                    <WorkDetailsForm />
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 p-8 overflow-auto">
      <div className="max-w-[1300px] mx-auto"> {/* New container div */}
        <h2 className="text-2xl font-bold text-[#0C7FDA] mb-4">{selectedNav}</h2>
        {selectedNav === 'Personal Info' ? (
          <Card>
            <CardContent className="py-6">
              <Tabs defaultValue="personal">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger 
                    value="personal"
                    className="data-[state=active]:bg-[#0C7FDA] data-[state=active]:text-white "
                  >
                    Personal Details
                  </TabsTrigger>
                  <TabsTrigger 
                    value="work"
                    className="data-[state=active]:bg-[#0C7FDA] data-[state=active]:text-white "
                  >
                    Work Details
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="personal">
                  <PersonalDetailsForm />
                </TabsContent>
                <TabsContent value="work">
                  <WorkDetailsForm />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent>
              <p className="text-[#5D7285] mb-4">Content for {selectedNav} goes here.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default MainContent
