import ManageScheduleForm from '@/components/personnel/ManageScheduleForm'
import { Label } from "@/components/ui/label";
import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 w-full">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <Label className="text-2xl font-semibold mb-6 text-center">
          Administrar Horario
        </Label>
        <ManageScheduleForm />
      </div>
    </div>
  )
}

export default page