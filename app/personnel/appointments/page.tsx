'use client'
import PersonnelAppointmentsTable from '@/components/personnel/PersonnelAppointmentsTable'
import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 w-full">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Lista de mis citas
        </h1>
        <ChakraProvider>
        <PersonnelAppointmentsTable/>
        </ChakraProvider>
      </div>
    </div>
  )
}

export default page