import React from 'react'
import { useNavigate } from 'react-router-dom'

const StudentHeader = () => {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('userRole')
    navigate('/login')
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex justify-between items-center px-6 py-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Student Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={logout}
            className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
              S
            </div>
            <span className="text-gray-700">John Smith</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default StudentHeader