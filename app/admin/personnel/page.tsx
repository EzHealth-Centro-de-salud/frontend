import PersonnelSingleCard from '@/components/personnel/PersonnelSingleCard'
import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 w-full">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <PersonnelSingleCard />
      </div>
    </div>
  )
}

export default page