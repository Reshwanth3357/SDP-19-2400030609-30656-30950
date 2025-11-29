import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Users } from 'lucide-react'

const scheduleData = [
  {
    id: 1,
    title: 'Advanced React Workshop',
    time: '09:00 - 11:00',
    date: '2024-01-15',
    location: 'Room A-101',
    instructor: 'Dr. Sarah Johnson',
    students: 25,
    type: 'workshop'
  },
  {
    id: 2,
    title: 'Database Design Lecture',
    time: '11:30 - 13:00',
    date: '2024-01-15',
    location: 'Hall B-205',
    instructor: 'Prof. Michael Chen',
    students: 45,
    type: 'lecture'
  },
  {
    id: 3,
    title: 'JavaScript Fundamentals',
    time: '14:00 - 16:00',
    date: '2024-01-15',
    location: 'Lab C-301',
    instructor: 'Ms. Emily Davis',
    students: 30,
    type: 'lab'
  },
  {
    id: 4,
    title: 'Project Presentation',
    time: '16:30 - 18:00',
    date: '2024-01-15',
    location: 'Auditorium',
    instructor: 'Dr. Robert Wilson',
    students: 60,
    type: 'presentation'
  }
]

const typeColors = {
  workshop: 'bg-blue-100 text-blue-800 border-blue-200',
  lecture: 'bg-green-100 text-green-800 border-green-200',
  lab: 'bg-purple-100 text-purple-800 border-purple-200',
  presentation: 'bg-orange-100 text-orange-800 border-orange-200'
}

export default function Schedule() {
  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold text-black mb-2">
          Class Schedule
        </h1>
        <p className="text-black">
          Today's schedule and upcoming classes
        </p>
      </motion.div>

      <div className="grid gap-4">
        {scheduleData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow ${
              index % 4 === 0 ? 'bg-gradient-to-br from-slate-50 to-gray-100 border border-slate-200' :
              index % 4 === 1 ? 'bg-gradient-to-br from-emerald-50 to-teal-100 border border-emerald-200' :
              index % 4 === 2 ? 'bg-gradient-to-br from-orange-50 to-red-100 border border-orange-200' :
              'bg-gradient-to-br from-purple-50 to-violet-100 border border-purple-200'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg font-semibold text-black">
                    {item.title}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${typeColors[item.type]}`}>
                    {item.type}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-black">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{item.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{item.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{item.students} students</span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <p className="text-sm font-medium text-black">
                    Instructor: {item.instructor}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}