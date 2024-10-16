import React from 'react'
import { Bell, Settings } from 'lucide-react'

const TopNav = () => {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <h2 className="text-2xl font-semibold text-[#fffff]">Data Collection</h2>
      <div className="flex items-center space-x-4">
        <button className="text-[#5D7285]">
          <Bell size={24} />
        </button>
        <button className="text-[#5D7285]">
          <Settings size={24} />
        </button>
        <div className="w-10 h-10 bg-[#0C7FDA] rounded-full"></div>
      </div>
    </div>
  )
}

export default TopNav