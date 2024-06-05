import PersonnelTable from '@/components/admin/personnel/PersonnelTable'
import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 w-full">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Lista de Personal
        </h1>
        <PersonnelTable/>
      </div>    
    </div>
  )
}

export default page