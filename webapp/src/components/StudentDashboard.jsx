import React from 'react'

const StudentDashboard = () => {
  const upcomingClasses = [
    { id: 1, subject: 'Mathematics', time: '10:00 AM', room: 'Room 101' },
    { id: 2, subject: 'Physics', time: '2:00 PM', room: 'Lab 205' }
  ]

  const recentGrades = [
    { id: 1, subject: 'Math Quiz', grade: 'A', date: '2024-01-10' },
    { id: 2, subject: 'Physics Lab', grade: 'B+', date: '2024-01-08' }
  ]

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back!</h2>
        <p className="text-gray-600">Here's what's happening with your studies today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Courses</h3>
          <p className="text-3xl font-bold text-blue-600">5</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Pending Assignments</h3>
          <p className="text-3xl font-bold text-orange-600">3</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Average Grade</h3>
          <p className="text-3xl font-bold text-green-600">A-</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Classes</h3>
          <div className="space-y-3">
            {upcomingClasses.map(cls => (
              <div key={cls.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium text-gray-900">{cls.subject}</p>
                  <p className="text-sm text-gray-600">{cls.room}</p>
                </div>
                <span className="text-sm font-medium text-blue-600">{cls.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Grades</h3>
          <div className="space-y-3">
            {recentGrades.map(grade => (
              <div key={grade.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium text-gray-900">{grade.subject}</p>
                  <p className="text-sm text-gray-600">{grade.date}</p>
                </div>
                <span className="text-lg font-bold text-green-600">{grade.grade}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard