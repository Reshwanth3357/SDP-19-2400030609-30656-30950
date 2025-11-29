import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import Students from './components/Students'
import Courses from './components/Courses'
import Grades from './components/Grades'
import Schedule from './components/Schedule'
import Reports from './components/Reports'
import Settings from './components/Settings'
import Profile from './components/Profile'
import MeetingAttendance from './components/MeetingAttendance'
import StudentLayout from './components/StudentLayout'
import StudentDashboard from './components/StudentDashboard'
import StudentMeeting from './components/StudentMeeting'
import StudentGrades from './components/StudentGrades'
import StudentProfile from './components/StudentProfile'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={
              <ProtectedRoute requiredRole="admin">
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="students" element={<Students />} />
              <Route path="courses" element={<Courses />} />
              <Route path="grades" element={<Grades />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="meeting-attendance" element={<MeetingAttendance />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<Settings />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="/student" element={
              <ProtectedRoute requiredRole="student">
                <StudentLayout />
              </ProtectedRoute>
            }>
              <Route index element={<StudentDashboard />} />
              <Route path="courses" element={<Courses />} />
              <Route path="assignments" element={
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Assignments</h2>
                  <div className="grid gap-6">
                    <div className="bg-white rounded-lg shadow p-6">
                      <h3 className="text-lg font-semibold mb-2">Math Assignment 1</h3>
                      <p className="text-gray-600 mb-3">Complete exercises 1-15 from Chapter 3</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Due: March 15, 2024</span>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Pending</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                      <h3 className="text-lg font-semibold mb-2">Science Project</h3>
                      <p className="text-gray-600 mb-3">Research and present on renewable energy sources</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Due: March 20, 2024</span>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Submitted</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                      <h3 className="text-lg font-semibold mb-2">English Essay</h3>
                      <p className="text-gray-600 mb-3">Write a 500-word essay on modern literature</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Due: March 25, 2024</span>
                        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">Overdue</span>
                      </div>
                    </div>
                  </div>
                </div>
              } />
              <Route path="grades" element={<StudentGrades />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="meeting" element={<StudentMeeting />} />
              <Route path="profile" element={<StudentProfile />} />
            </Route>
          </Routes>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App