import CreateBranchForm from '@/components/admin/CreateBranchForm'
import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white w-full max-w-md shadow-xl mt-10    px-8 pb-8 pt-12  rounded-xl space-y-12">
        <CreateBranchForm />
      </div>
    </div>
    
  )
}

export default page