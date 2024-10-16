import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { PersonalDetailsForm } from './PersonalDetailsForm'
import { WorkDetailsForm } from './WorkDetailsForm'

const MainContent = ({ selectedNav }) => {
  if (selectedNav === 'Personal Info') {
    return (
      <div className="flex-1 p-8 overflow-auto">
        <h2 className="text-2xl font-bold text-[#0C7FDA] mb-4">{selectedNav}</h2>
        <Card>
          <CardContent className="pt-6">
            <Tabs defaultValue="personal">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="personal">Personal Details</TabsTrigger>
                <TabsTrigger value="work">Work Details</TabsTrigger>
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
      </div>
    )
  }

  return (
    <div className="flex-1 p-8 overflow-auto">
      <h2 className="text-2xl font-bold text-[#0C7FDA] mb-4">{selectedNav}</h2>
      <Card>
        <CardContent>
          <p className="text-[#5D7285] mb-4">Content for {selectedNav} goes here.</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default MainContent