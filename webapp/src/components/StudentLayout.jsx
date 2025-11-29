import React from 'react'
import { Outlet } from 'react-router-dom'
import StudentSidebar from './StudentSidebar'
import StudentHeader from './StudentHeader'

const StudentLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <StudentSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <StudentHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default StudentLayout