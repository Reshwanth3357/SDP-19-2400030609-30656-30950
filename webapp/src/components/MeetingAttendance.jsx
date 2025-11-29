import React, { useState, useEffect } from 'react'
import meetingService from '../utils/meetingService'

const MeetingAttendance = () => {
  const [meetings, setMeetings] = useState([])
  const [selectedMeeting, setSelectedMeeting] = useState(null)
  const [attendanceData, setAttendanceData] = useState([])

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockMeetings = [
      {
        id: 1,
        title: 'Math Class - Algebra',
        scheduledTime: new Date('2024-01-15T10:00:00'),
        duration: 60,
        status: 'active'
      },
      {
        id: 2,
        title: 'Science Lab Session',
        scheduledTime: new Date('2024-01-15T14:00:00'),
        duration: 90,
        status: 'scheduled'
      }
    ]
    setMeetings(mockMeetings)
  }, [])

  // Simulate real-time attendance updates
  useEffect(() => {
    if (!selectedMeeting) return

    const mockAttendance = [
      {
        studentId: 1,
        studentName: 'John Doe',
        joinTime: new Date('2024-01-15T10:02:00'),
        status: 'joined',
        isOnline: true
      },
      {
        studentId: 2,
        studentName: 'Jane Smith',
        joinTime: new Date('2024-01-15T10:05:00'),
        status: 'joined',
        isOnline: true
      },
      {
        studentId: 3,
        studentName: 'Mike Johnson',
        joinTime: null,
        status: 'absent',
        isOnline: false
      }
    ]

    setAttendanceData(mockAttendance)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setAttendanceData(prev => 
        prev.map(student => ({
          ...student,
          isOnline: Math.random() > 0.1 // 90% chance to stay online
        }))
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [selectedMeeting])

  const handleMeetingSelect = (meeting) => {
    setSelectedMeeting(meeting)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'joined': return 'text-green-600'
      case 'absent': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Meeting Attendance</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Meetings List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Scheduled Meetings</h2>
            <div className="space-y-3">
              {meetings.map(meeting => (
                <div
                  key={meeting.id}
                  onClick={() => handleMeetingSelect(meeting)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedMeeting?.id === meeting.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h3 className="font-medium text-gray-900">{meeting.title}</h3>
                  <p className="text-sm text-gray-600">
                    {meeting.scheduledTime.toLocaleString()}
                  </p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    meeting.status === 'active' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {meeting.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Attendance Details */}
        <div className="lg:col-span-2">
          {selectedMeeting ? (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold">{selectedMeeting.title}</h2>
                  <p className="text-gray-600">
                    {selectedMeeting.scheduledTime.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">Live</span>
                </div>
              </div>

              {/* Attendance Summary */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {attendanceData.filter(s => s.status === 'joined').length}
                  </div>
                  <div className="text-sm text-green-600">Present</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {attendanceData.filter(s => s.status === 'absent').length}
                  </div>
                  <div className="text-sm text-red-600">Absent</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {attendanceData.filter(s => s.isOnline).length}
                  </div>
                  <div className="text-sm text-blue-600">Online Now</div>
                </div>
              </div>

              {/* Student List */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Join Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Online
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {attendanceData.map(student => (
                      <tr key={student.studentId}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {student.studentName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {student.joinTime 
                              ? student.joinTime.toLocaleTimeString()
                              : '-'
                            }
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-sm font-medium ${getStatusColor(student.status)}`}>
                            {student.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-2 ${
                              student.isOnline ? 'bg-green-500' : 'bg-gray-300'
                            }`}></div>
                            <span className="text-sm text-gray-900">
                              {student.isOnline ? 'Online' : 'Offline'}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-gray-500">Select a meeting to view attendance details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MeetingAttendance