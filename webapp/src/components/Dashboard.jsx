import { motion } from 'framer-motion'
import { Users, BookOpen, GraduationCap, TrendingUp, Calendar, Award } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import useStore from '../store/useStore'

const enrollmentData = [
  { month: 'Jan', students: 120 },
  { month: 'Feb', students: 135 },
  { month: 'Mar', students: 148 },
  { month: 'Apr', students: 162 },
  { month: 'May', students: 175 },
  { month: 'Jun', students: 190 }
]

const gradeDistribution = [
  { grade: 'A+', count: 45, color: '#10B981' },
  { grade: 'A', count: 78, color: '#3B82F6' },
  { grade: 'B+', count: 65, color: '#8B5CF6' },
  { grade: 'B', count: 42, color: '#F59E0B' },
  { grade: 'C+', count: 28, color: '#EF4444' },
  { grade: 'C', count: 15, color: '#6B7280' }
]

const coursePerformance = [
  { course: 'CS101', average: 85 },
  { course: 'MATH201', average: 78 },
  { course: 'PHY101', average: 82 },
  { course: 'ENG101', average: 88 },
  { course: 'CHEM101', average: 75 }
]

export default function Dashboard() {
  const { students, courses, grades, searchQuery, searchResults } = useStore()

  const stats = [
    {
      name: 'Total Students',
      value: '6,000',
      icon: Users,
      change: '+12%',
      changeType: 'positive'
    },
    {
      name: 'Active Courses',
      value: '40',
      icon: BookOpen,
      change: '+3%',
      changeType: 'positive'
    },
    {
      name: 'Average GPA',
      value: '7.0',
      icon: GraduationCap,
      change: '+0.2',
      changeType: 'positive'
    },
    {
      name: 'Graduation Rate',
      value: '94%',
      icon: Award,
      change: '+2%',
      changeType: 'positive'
    }
  ]

  // Show search results if there's an active search
  if (searchQuery && searchResults.length > 0) {
    return (
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-black">Search Results</h1>
            <p className="text-black mt-1">
              Found {searchResults.length} results for "{searchQuery}"
            </p>
          </div>
        </motion.div>

        <div className="grid gap-4">
          {searchResults.map((result, index) => (
            <motion.div
              key={`${result.type}-${result.data.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 text-sm rounded-full font-medium ${
                      result.type === 'student' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                        : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    }`}>
                      {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {result.type === 'student' ? result.data.name : result.data.name}
                    </h3>
                  </div>
                  
                  {result.type === 'student' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div><strong>Email:</strong> {result.data.email}</div>
                      <div><strong>Major:</strong> {result.data.major}</div>
                      <div><strong>GPA:</strong> {result.data.gpa}</div>
                      <div><strong>Semester:</strong> {result.data.semester}</div>
                      <div><strong>Status:</strong> {result.data.status}</div>
                      <div><strong>Phone:</strong> {result.data.phone}</div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div><strong>Code:</strong> {result.data.code}</div>
                      <div><strong>Instructor:</strong> {result.data.instructor}</div>
                      <div><strong>Credits:</strong> {result.data.credits}</div>
                      <div><strong>Schedule:</strong> {result.data.schedule}</div>
                      <div><strong>Enrolled:</strong> {result.data.enrolled}/{result.data.capacity}</div>
                      <div><strong>Semester:</strong> {result.data.semester}</div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-black">Dashboard</h1>
          <p className="text-black mt-1">Welcome back! Here's what's happening at your institution.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Calendar className="w-4 h-4" />
          <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-xl shadow-sm p-6 ${
              index === 0 ? 'bg-gradient-to-br from-rose-50 to-pink-100 border border-rose-200' :
              index === 1 ? 'bg-gradient-to-br from-emerald-50 to-green-100 border border-emerald-200' :
              index === 2 ? 'bg-gradient-to-br from-violet-50 to-purple-100 border border-violet-200' :
              'bg-gradient-to-br from-amber-50 to-orange-100 border border-amber-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-black">{stat.name}</p>
                <p className="text-2xl font-bold text-black mt-1">{stat.value}</p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm font-medium text-green-600 dark:text-green-400">{stat.change}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">from last month</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Trend */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Student Enrollment Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Line type="monotone" dataKey="students" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Course Performance */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Course Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={coursePerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="course" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Bar dataKey="average" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Grade Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Grade Distribution</h3>
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={gradeDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="count"
                  label={({ grade, count }) => `${grade}: ${count}`}
                >
                  {gradeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full lg:w-1/2 lg:pl-6">
            <div className="space-y-3">
              {gradeDistribution.map((item) => (
                <div key={item.grade} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded-full mr-3" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Grade {item.grade}</span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{item.count} students</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}