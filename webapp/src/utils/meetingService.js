// Meeting attendance service for real-time tracking
class MeetingService {
  constructor() {
    this.attendanceListeners = new Map()
    this.meetings = new Map()
  }

  // Start tracking attendance for a meeting
  startMeetingTracking(meetingId) {
    const meeting = {
      id: meetingId,
      startTime: new Date(),
      attendees: new Map(),
      isActive: true
    }
    this.meetings.set(meetingId, meeting)
    return meeting
  }

  // Record student joining the meeting
  recordStudentJoin(meetingId, studentId, studentName) {
    const meeting = this.meetings.get(meetingId)
    if (!meeting) return null

    const joinTime = new Date()
    const attendee = {
      studentId,
      studentName,
      joinTime,
      status: 'joined',
      isOnline: true,
      lastSeen: joinTime
    }

    meeting.attendees.set(studentId, attendee)
    this.notifyAttendanceUpdate(meetingId, attendee)
    
    return attendee
  }

  // Record student leaving the meeting
  recordStudentLeave(meetingId, studentId) {
    const meeting = this.meetings.get(meetingId)
    if (!meeting) return null

    const attendee = meeting.attendees.get(studentId)
    if (attendee) {
      attendee.isOnline = false
      attendee.leaveTime = new Date()
      this.notifyAttendanceUpdate(meetingId, attendee)
    }
    
    return attendee
  }

  // Get current attendance for a meeting
  getMeetingAttendance(meetingId) {
    const meeting = this.meetings.get(meetingId)
    if (!meeting) return []

    return Array.from(meeting.attendees.values())
  }

  // Subscribe to attendance updates
  subscribeToAttendance(meetingId, callback) {
    if (!this.attendanceListeners.has(meetingId)) {
      this.attendanceListeners.set(meetingId, new Set())
    }
    this.attendanceListeners.get(meetingId).add(callback)

    // Return unsubscribe function
    return () => {
      const listeners = this.attendanceListeners.get(meetingId)
      if (listeners) {
        listeners.delete(callback)
      }
    }
  }

  // Notify all listeners of attendance updates
  notifyAttendanceUpdate(meetingId, attendee) {
    const listeners = this.attendanceListeners.get(meetingId)
    if (listeners) {
      listeners.forEach(callback => callback(attendee))
    }
  }

  // End meeting tracking
  endMeeting(meetingId) {
    const meeting = this.meetings.get(meetingId)
    if (meeting) {
      meeting.isActive = false
      meeting.endTime = new Date()
    }
  }

  // Get meeting statistics
  getMeetingStats(meetingId) {
    const meeting = this.meetings.get(meetingId)
    if (!meeting) return null

    const attendees = Array.from(meeting.attendees.values())
    return {
      totalStudents: attendees.length,
      presentStudents: attendees.filter(a => a.status === 'joined').length,
      onlineStudents: attendees.filter(a => a.isOnline).length,
      averageJoinTime: this.calculateAverageJoinTime(attendees, meeting.startTime)
    }
  }

  calculateAverageJoinTime(attendees, meetingStart) {
    const joinTimes = attendees
      .filter(a => a.joinTime)
      .map(a => a.joinTime.getTime() - meetingStart.getTime())
    
    if (joinTimes.length === 0) return 0
    return joinTimes.reduce((sum, time) => sum + time, 0) / joinTimes.length
  }
}

// Create singleton instance
const meetingService = new MeetingService()

export default meetingService