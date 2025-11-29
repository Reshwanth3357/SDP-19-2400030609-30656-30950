import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Search, Filter, Edit, Trash2, Award, TrendingUp, BarChart3 } from 'lucide-react'
import { useDebounce } from '../hooks/useDebounce'
import useStore from '../store/useStore'
import Modal from './ui/Modal'
import GradeForm from './forms/GradeForm'
import toast from 'react-hot-toast'

const gradeColors = {
  'A+': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  'A': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  'B+': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
  'B': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
  'C+': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
  'C': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
  'D': 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
  'F': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
}

export default function Grades() {
  const { grades, students, courses, deleteGrade, getStudentById, getCourseById } = useStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSemester, setFilterSemester] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingGrade, setEditingGrade] = useState(null)

  const debouncedSearch = useDebounce(searchTerm, 300)

  const enrichedGrades = useMemo(() => {
    return grades.map(grade => ({
      ...grade,
      student: getStudentById(grade.studentId),
      course: getCourseById(grade.courseId)
    }))
  }, [grades, getStudentById, getCourseById])

  const filteredGrades = useMemo(() => {
    return enrichedGrades.filter(grade => {
      const matchesSearch = grade.student?.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                           grade.course?.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                           grade.course?.code.toLowerCase().includes(debouncedSearch.toLowerCase())
      const matchesFilter = filterSemester === 'all' || grade.semester === filterSemester
      return matchesSearch && matchesFilter
    })
  }, [enrichedGrades, debouncedSearch, filterSemester])

  const handleEdit = (grade) => {
    setEditingGrade(grade)
    setShowModal(true)
  }

  const handleDelete = (grade) => {
    if (window.confirm(`Are you sure you want to delete this grade record?`)) {
      deleteGrade(grade.id)
      toast.success('Grade deleted successfully')
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingGrade(null)
  }

  const calculateAssignmentAverage = (assignments) => {
    if (!assignments || assignments.length === 0) return 0
    const total = assignments.reduce((sum, assignment) => sum + (assignment.score / assignment.maxScore) * 100, 0)
    return (total / assignments.length).toFixed(1)
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-black">Grades</h1>
          <p className="text-black mt-1">Manage student grades and academic performance</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Grade
        </motion.button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by student or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterSemester}
              onChange={(e) => setFilterSemester(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Semesters</option>
              <option value="Fall 2024">Fall 2024</option>
              <option value="Spring 2024">Spring 2024</option>
              <option value="Summer 2024">Summer 2024</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Grades Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <AnimatePresence>
          {filteredGrades.map((grade, index) => (
            <motion.div
              key={grade.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
              className={`rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow ${
                index % 3 === 0 ? 'bg-gradient-to-br from-indigo-50 to-blue-100 border border-indigo-200' :
                index % 3 === 1 ? 'bg-gradient-to-br from-teal-50 to-cyan-100 border border-teal-200' :
                'bg-gradient-to-br from-red-50 to-rose-100 border border-red-200'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-black">{grade.student?.name}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${gradeColors[grade.grade] || 'bg-gray-100 text-gray-800'}`}>
                      {grade.grade}
                    </span>
                  </div>
                  <p className="text-sm text-black">
                    {grade.course?.code} - {grade.course?.name}
                  </p>
                  <p className="text-xs text-black mt-1">{grade.semester}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-2xl font-bold text-black mb-1">
                    <Award className="w-5 h-5 mr-1 text-yellow-500" />
                    {grade.points}
                  </div>
                  <p className="text-xs text-black">GPA Points</p>
                </div>
              </div>

              {grade.assignments && grade.assignments.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Assignments</h4>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <BarChart3 className="w-4 h-4 mr-1" />
                      Avg: {calculateAssignmentAverage(grade.assignments)}%
                    </div>
                  </div>
                  <div className="space-y-2">
                    {grade.assignments.map((assignment, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">{assignment.name}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-900 dark:text-white font-medium">
                            {assignment.score}/{assignment.maxScore}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            (assignment.score / assignment.maxScore) >= 0.9 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                              : (assignment.score / assignment.maxScore) >= 0.8
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                              : (assignment.score / assignment.maxScore) >= 0.7
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                              : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                          }`}>
                            {Math.round((assignment.score / assignment.maxScore) * 100)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleEdit(grade)}
                  className="flex-1 flex items-center justify-center px-3 py-2 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(grade)}
                  className="flex items-center justify-center px-3 py-2 text-sm bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredGrades.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No grades found</h3>
          <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}

      {/* Add/Edit Modal */}
      <Modal isOpen={showModal} onClose={closeModal} title={editingGrade ? 'Edit Grade' : 'Add New Grade'}>
        <GradeForm grade={editingGrade} onClose={closeModal} />
      </Modal>
    </div>
  )
}