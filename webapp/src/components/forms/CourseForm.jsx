import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import useStore from '../../store/useStore'
import toast from 'react-hot-toast'

const courseSchema = z.object({
  code: z.string().min(3, 'Course code must be at least 3 characters'),
  name: z.string().min(3, 'Course name must be at least 3 characters'),
  credits: z.number().min(1).max(6, 'Credits must be between 1 and 6'),
  instructor: z.string().min(2, 'Instructor name is required'),
  schedule: z.string().min(3, 'Schedule is required'),
  capacity: z.number().min(1, 'Capacity must be at least 1'),
  semester: z.string().min(1, 'Semester is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  backgroundImage: z.string().optional()
})

export default function CourseForm({ course, onClose }) {
  const { addCourse, updateCourse } = useStore()
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: course || {
      code: '',
      name: '',
      credits: 3,
      instructor: '',
      schedule: '',
      capacity: 30,
      semester: 'Fall 2024',
      description: '',
      backgroundImage: ''
    }
  })

  const onSubmit = async (data) => {
    try {
      if (course) {
        updateCourse(course.id, data)
        toast.success('Course updated successfully')
      } else {
        addCourse(data)
        toast.success('Course added successfully')
      }
      onClose()
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Course Code
          </label>
          <input
            {...register('code')}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="e.g., CS101"
          />
          {errors.code && (
            <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Course Name
          </label>
          <input
            {...register('name')}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Enter course name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Credits
          </label>
          <input
            {...register('credits', { valueAsNumber: true })}
            type="number"
            min="1"
            max="6"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Enter credits"
          />
          {errors.credits && (
            <p className="text-red-500 text-sm mt-1">{errors.credits.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Instructor
          </label>
          <input
            {...register('instructor')}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Enter instructor name"
          />
          {errors.instructor && (
            <p className="text-red-500 text-sm mt-1">{errors.instructor.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Schedule
          </label>
          <input
            {...register('schedule')}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="e.g., MWF 10:00-11:00"
          />
          {errors.schedule && (
            <p className="text-red-500 text-sm mt-1">{errors.schedule.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Capacity
          </label>
          <input
            {...register('capacity', { valueAsNumber: true })}
            type="number"
            min="1"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Enter capacity"
          />
          {errors.capacity && (
            <p className="text-red-500 text-sm mt-1">{errors.capacity.message}</p>
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

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description
        </label>
        <textarea
          {...register('description')}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="Enter course description"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Background Image URL (Optional)
        </label>
        <input
          {...register('backgroundImage')}
          type="url"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="Enter image URL for course background"
        />
        {errors.backgroundImage && (
          <p className="text-red-500 text-sm mt-1">{errors.backgroundImage.message}</p>
        )}
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
          {isSubmitting ? 'Saving...' : course ? 'Update Course' : 'Add Course'}
        </motion.button>
      </div>
    </motion.form>
  )
}