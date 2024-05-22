import CreateBoxFormComponent from '@/components/admin/box/CreateBoxForm'
import React from 'react'

const NewBoxPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 w-full">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Agregar Box a Sucursal
        </h1>
        <CreateBoxFormComponent />
      </div>
    </div>
  );
}

export default NewBoxPage