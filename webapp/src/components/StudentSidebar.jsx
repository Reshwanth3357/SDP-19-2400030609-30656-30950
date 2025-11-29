import React from 'react'
import { NavLink } from 'react-router-dom'

const StudentSidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/student', icon: '📊' },
    { name: 'My Courses', path: '/student/courses', icon: '📚' },
    { name: 'Assignments', path: '/student/assignments', icon: '📝' },
    { name: 'Grades', path: '/student/grades', icon: '🎯' },
    { name: 'Schedule', path: '/student/schedule', icon: '📅' },
    { name: 'Join Meeting', path: '/student/meeting', icon: '🎥' },
    { name: 'Profile', path: '/student/profile', icon: '👤' }
  ]

  return (
    <div className="bg-white w-64 min-h-screen shadow-lg">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">Student Portal</h2>
      </div>
      <nav className="mt-8">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                isActive ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : ''
              }`
            }
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

export default StudentSidebar