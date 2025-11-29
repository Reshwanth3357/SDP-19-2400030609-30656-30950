import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Search, Filter, Edit, Trash2, Users, Clock, BookOpen, User } from 'lucide-react'
import { useDebounce } from '../hooks/useDebounce'
import useStore from '../store/useStore'
import Modal from './ui/Modal'
import CourseForm from './forms/CourseForm'
import toast from 'react-hot-toast'

export default function Courses() {
  const { courses, deleteCourse } = useStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSemester, setFilterSemester] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingCourse, setEditingCourse] = useState(null)
  const [showBookModal, setShowBookModal] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)

  const debouncedSearch = useDebounce(searchTerm, 300)

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                           course.code.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                           course.instructor.toLowerCase().includes(debouncedSearch.toLowerCase())
      const matchesFilter = filterSemester === 'all' || course.semester === filterSemester
      return matchesSearch && matchesFilter
    })
  }, [courses, debouncedSearch, filterSemester])

  const handleEdit = (course) => {
    setEditingCourse(course)
    setShowModal(true)
  }

  const handleDelete = (course) => {
    if (window.confirm(`Are you sure you want to delete ${course.name}?`)) {
      deleteCourse(course.id)
      toast.success('Course deleted successfully')
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingCourse(null)
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-black">Courses</h1>
          <p className="text-black mt-1">Manage course catalog and schedules</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Course
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
              placeholder="Search courses..."
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

      {/* Courses Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              style={{
                backgroundImage: course.backgroundImage ? `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${course.backgroundImage})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-full">
                      {course.code}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{course.credits} Credits</span>
                  </div>
                  <h3 className="font-bold text-black text-lg">{course.name}</h3>
                </div>
              </div>

              <p className="text-sm text-black font-medium mb-2 line-clamp-2">
                {course.description}
              </p>
              
              {course.name === 'Introduction to Programming' && (
                <div 
                  className="mb-4 p-2 bg-blue-50 rounded border cursor-pointer hover:bg-blue-100 transition-colors"
                  onClick={() => {
                    setSelectedBook({
                      title: 'Python Programming: An Introduction to Computer Science',
                      author: 'John Zelle',
                      description: 'This book is designed to be used as the primary textbook in a college-level first course in computing. It takes a fairly traditional approach, emphasizing problem solving, design, and programming as the core skills of computer science.',
                      pages: 533,
                      isbn: '978-1590282755',
                      publisher: 'Franklin, Beedle & Associates'
                    })
                    setShowBookModal(true)
                  }}
                >
                  <p className="text-xs text-black font-medium">
                    📚 Book: Python Programming: An Introduction to Computer Science by John Zelle
                  </p>
                </div>
              )}
              
              {course.name === 'Calculus II' && (
                <div 
                  className="mb-4 p-2 bg-green-50 rounded border cursor-pointer hover:bg-green-100 transition-colors"
                  onClick={() => {
                    setSelectedBook({
                      title: 'Calculus: Early Transcendentals',
                      author: 'James Stewart',
                      description: 'Stewart\'s CALCULUS: EARLY TRANSCENDENTALS has the mathematical precision, accuracy, clarity of exposition and outstanding examples and problem sets that have made it the most popular calculus text in the world.',
                      pages: 1368,
                      isbn: '978-1285741550',
                      publisher: 'Cengage Learning'
                    })
                    setShowBookModal(true)
                  }}
                >
                  <p className="text-xs text-black font-medium">
                    📚 Book: Calculus: Early Transcendentals by James Stewart
                  </p>
                </div>
              )}

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-black font-medium">
                  <User className="w-4 h-4 mr-2" />
                  {course.instructor}
                </div>
                <div className="flex items-center text-sm text-black font-medium">
                  <Clock className="w-4 h-4 mr-2" />
                  {course.schedule}
                </div>
                <div className="flex items-center text-sm text-black font-medium">
                  <Users className="w-4 h-4 mr-2" />
                  {course.enrolled}/{course.capacity} Students
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-black font-medium mb-1">
                  <span>Enrollment</span>
                  <span>{Math.round((course.enrolled / course.capacity) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(course.enrolled / course.capacity) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleEdit(course)}
                  className="flex-1 flex items-center justify-center px-3 py-2 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(course)}
                  className="flex items-center justify-center px-3 py-2 text-sm bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredCourses.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No courses found</h3>
          <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}

      {/* Add/Edit Modal */}
      <Modal isOpen={showModal} onClose={closeModal} title={editingCourse ? 'Edit Course' : 'Add New Course'}>
        <CourseForm course={editingCourse} onClose={closeModal} />
      </Modal>

      {/* Book Details Modal */}
      {selectedBook && (
        <Modal isOpen={showBookModal} onClose={() => setShowBookModal(false)} title="Book Details">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-black">{selectedBook.title}</h3>
              <p className="text-lg text-gray-600">by {selectedBook.author}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-black">{selectedBook.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-black">Pages:</span>
                <p className="text-black">{selectedBook.pages}</p>
              </div>
              <div>
                <span className="font-medium text-black">Publisher:</span>
                <p className="text-black">{selectedBook.publisher}</p>
              </div>
              <div>
                <span className="font-medium text-black">ISBN:</span>
                <p className="text-black">{selectedBook.isbn}</p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}