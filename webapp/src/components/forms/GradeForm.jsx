import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Plus, Trash2 } from 'lucide-react'
import useStore from '../../store/useStore'
import toast from 'react-hot-toast'

const assignmentSchema = z.object({
  name: z.string().min(1, 'Assignment name is required'),
  score: z.number().min(0, 'Score must be positive'),
  maxScore: z.number().min(1, 'Max score must be at least 1')
})

const gradeSchema = z.object({
  studentId: z.string().min(1, 'Student is required'),
  courseId: z.string().min(1, 'Course is required'),
  grade: z.enum(['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F']),
  points: z.number().min(0).max(4, 'Points must be between 0 and 4'),
  semester: z.string().min(1, 'Semester is required'),
  assignments: z.array(assignmentSchema).optional()
})

const gradeToPoints = {
  'A+': 4.0,
  'A': 4.0,
  'B+': 3.5,
  'B': 3.0,
  'C+': 2.5,
  'C': 2.0,
  'D': 1.0,
  'F': 0.0
}

export default function GradeForm({ grade, onClose }) {
  const { students, courses, addGrade, updateGrade } = useStore()
  
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(gradeSchema),
    defaultValues: grade || {
      studentId: '',
      courseId: '',
      grade: 'A',
      points: 4.0,
      semester: 'Fall 2024',
      assignments: []
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'assignments'
  })

  const watchedGrade = watch('grade')

  // Auto-update points when grade changes
  React.useEffect(() => {
    if (watchedGrade && gradeToPoints[watchedGrade] !== undefined) {
      setValue('points', gradeToPoints[watchedGrade])
    }
  }, [watchedGrade, setValue])

  const onSubmit = async (data) => {
    try {
      if (grade) {
        updateGrade(grade.id, data)
        toast.success('Grade updated successfully')
      } else {
        addGrade(data)
        toast.success('Grade added successfully')
      }
      onClose()
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const addAssignment = () => {
    append({ name: '', score: 0, maxScore: 100 })
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Student
          </label>
          <select
            {...register('studentId')}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">Select Student</option>
            {students.map(student => (
              <option key={student.id} value={student.id}>
                {student.name} - {student.major}
              </option>
            ))}
          </select>
          {errors.studentId && (
            <p className="text-red-500 text-sm mt-1">{errors.studentId.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Course
          </label>
          <select
            {...register('courseId')}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">Select Course</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>
                {course.code} - {course.name}
              </option>
            ))}
          </select>
          {errors.courseId && (
            <p className="text-red-500 text-sm mt-1">{errors.courseId.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Grade
          </label>
          <select
            {...register('grade')}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="A+">A+ (4.0)</option>
            <option value="A">A (4.0)</option>
            <option value="B+">B+ (3.5)</option>
            <option value="B">B (3.0)</option>
            <option value="C+">C+ (2.5)</option>
            <option value="C">C (2.0)</option>
            <option value="D">D (1.0)</option>
            <option value="F">F (0.0)</option>
          </select>
          {errors.grade && (
            <p className="text-red-500 text-sm mt-1">{errors.grade.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            GPA Points
          </label>
          <input
            {...register('points', { valueAsNumber: true })}
            type="number"
            step="0.1"
            min="0"
            max="4"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            readOnly
          />
          {errors.points && (
            <p className="text-red-500 text-sm mt-1">{errors.points.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Semester
        </label>
        <select
          {...register('semester')}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="Fall 2024">Fall 2024</option>
          <option value="Spring 2024">Spring 2024</option>
          <option value="Summer 2024">Summer 2024</option>
          <option value="Fall 2025">Fall 2025</option>
          <option value="Spring 2025">Spring 2025</option>
        </select>
        {errors.semester && (
          <p className="text-red-500 text-sm mt-1">{errors.semester.message}</p>
        )}
      </div>

      {/* Assignments Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Assignments</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={addAssignment}
            className="flex items-center px-3 py-2 text-sm bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Assignment
          </motion.button>
        </div>

        <div className="space-y-3">
          {fields.map((field, index) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex-1">
                <input
                  {...register(`assignments.${index}.name`)}
                  type="text"
                  placeholder="Assignment name"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white text-sm"
                />
              </div>
              <div className="w-20">
                <input
                  {...register(`assignments.${index}.score`, { valueAsNumber: true })}
                  type="number"
                  placeholder="Score"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white text-sm"
                />
              </div>
              <div className="w-20">
                <input
                  {...register(`assignments.${index}.maxScore`, { valueAsNumber: true })}
                  type="number"
                  placeholder="Max"
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white text-sm"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={() => remove(index)}
                className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Cancel
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Saving...' : grade ? 'Update Grade' : 'Add Grade'}
        </motion.button>
      </div>
    </motion.form>
  )
}