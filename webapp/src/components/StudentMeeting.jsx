import React, { useState } from 'react'

const StudentMeeting = () => {
  const [meetingId, setMeetingId] = useState('')
  const [isJoined, setIsJoined] = useState(false)

  const scheduledMeetings = [
    { id: 'math-101', subject: 'Mathematics', time: '10:00 AM', status: 'active' },
    { id: 'physics-201', subject: 'Physics Lab', time: '2:00 PM', status: 'scheduled' }
  ]

  const joinMeeting = (id) => {
    setMeetingId(id)
    setIsJoined(true)
    // Simulate joining meeting
    setTimeout(() => {
      alert(`Joined meeting: ${id}`)
    }, 1000)
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Join Meeting</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Scheduled Meetings</h3>
          <div className="space-y-3">
            {scheduledMeetings.map(meeting => (
              <div key={meeting.id} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{meeting.subject}</h4>
                  <p className="text-sm text-gray-600">{meeting.time}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    meeting.status === 'active' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {meeting.status}
                  </span>
                </div>
                <button
                  onClick={() => joinMeeting(meeting.id)}
                  disabled={meeting.status !== 'active'}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    meeting.status === 'active'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {meeting.status === 'active' ? 'Join' : 'Not Started'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Join with Meeting ID</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter Meeting ID"
              value={meetingId}
              onChange={(e) => setMeetingId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => joinMeeting(meetingId)}
              disabled={!meetingId}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Join Meeting
            </button>
          </div>

          {isJoined && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
                <span className="text-green-800 font-medium">Connected to meeting</span>
              </div>
              <p className="text-sm text-green-600 mt-1">Meeting ID: {meetingId}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StudentMeeting