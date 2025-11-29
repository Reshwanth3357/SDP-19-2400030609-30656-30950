import React from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Users, BookOpen, Calendar, Download } from 'lucide-react'

const reportData = [
  {
    title: 'Student Enrollment Report',
    description: 'Total students enrolled across all courses',
    value: '1,234',
    change: '+12%',
    trend: 'up',
    icon: Users
  },
  {
    title: 'Course Completion Rate',
    description: 'Percentage of students completing courses',
    value: '87%',
    change: '+5%',
    trend: 'up',
    icon: BookOpen
  },
  {
    title: 'Monthly Attendance',
    description: 'Average attendance rate this month',
    value: '92%',
    change: '-2%',
    trend: 'down',
    icon: Calendar
  },
  {
    title: 'Grade Performance',
    description: 'Average grade across all courses',
    value: '8.4/10',
    change: '+0.3',
    trend: 'up',
    icon: BarChart3
  }
]

const recentReports = [
  {
    id: 1,
    name: 'Q4 Academic Performance Report',
    date: '2024-01-15',
    type: 'Academic',
    status: 'Ready'
  },
  {
    id: 2,
    name: 'Student Attendance Summary',
    date: '2024-01-14',
    type: 'Attendance',
    status: 'Ready'
  },
  {
    id: 3,
    name: 'Course Enrollment Analytics',
    date: '2024-01-13',
    type: 'Enrollment',
    status: 'Processing'
  },
  {
    id: 4,
    name: 'Faculty Performance Review',
    date: '2024-01-12',
    type: 'Faculty',
    status: 'Ready'
  }
]

export default function Reports() {
  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold text-black mb-2">
          Reports & Analytics
        </h1>
        <p className="text-black">
          View and download comprehensive reports
        </p>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {reportData.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-orange-50 to-yellow-100 rounded-lg shadow-sm border border-orange-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <item.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className={`text-sm font-medium ${
                item.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {item.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-black mb-1">
              {item.value}
            </h3>
            <p className="text-sm font-medium text-black mb-1">
              {item.title}
            </p>
            <p className="text-xs text-black">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Recent Reports */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-blue-50 rounded-lg shadow-sm border border-blue-200"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-black">
            Recent Reports
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-black">
                    {report.name}
                  </h3>
                  <div className="flex items-center gap-4 mt-1 text-sm text-black">
                    <span>{report.date}</span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                      {report.type}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      report.status === 'Ready' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                    }`}>
                      {report.status}
                    </span>
                  </div>
                </div>
                <button
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  disabled={report.status !== 'Ready'}
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}