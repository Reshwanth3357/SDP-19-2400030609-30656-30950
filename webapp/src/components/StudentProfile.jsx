import React from 'react'

const StudentProfile = () => {
  const studentInfo = {
    name: 'John Smith',
    email: 'john.smith@university.edu',
    studentId: 'STU001',
    major: 'Computer Science',
    year: 'Junior',
    gpa: '3.8'
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h2>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-6">
          <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            JS
          </div>
          <div className="ml-6">
            <h3 className="text-xl font-semibold text-gray-900">{studentInfo.name}</h3>
            <p className="text-gray-600">{studentInfo.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
            <p className="text-gray-900">{studentInfo.studentId}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Major</label>
            <p className="text-gray-900">{studentInfo.major}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
            <p className="text-gray-900">{studentInfo.year}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">GPA</label>
            <p className="text-gray-900 font-semibold">{studentInfo.gpa}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentProfile