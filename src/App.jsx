import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import TopNav from './components/TopNav'
import MainContent from './components/MainContent'

function App() {
  const [selectedNav, setSelectedNav] = useState('Personal Info')

  return (
    <div className="flex flex-col h-screen">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar selectedNav={selectedNav} setSelectedNav={setSelectedNav} />
        <MainContent selectedNav={selectedNav} />
      </div>
    </div>
  )
}

export default App