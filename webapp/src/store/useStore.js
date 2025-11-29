import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

const useStore = create()(
  devtools(
    persist(
      immer((set, get) => ({
        // Students State
        students: [
          {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1234567890',
            dateOfBirth: '2000-01-15',
            address: '123 Main St, City',
            enrollmentDate: '2023-09-01',
            status: 'active',
            gpa: 3.75,
            semester: 6,
            major: 'Computer Science'
          },
          {
            id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            phone: '+1234567891',
            dateOfBirth: '1999-05-20',
            address: '456 Oak Ave, City',
            enrollmentDate: '2023-09-01',
            status: 'active',
            gpa: 3.92,
            semester: 6,
            major: 'Mathematics'
          }
        ],

        // Courses State
        courses: [
          {
            id: '1',
            code: 'CS101',
            name: 'Introduction to Programming',
            credits: 3,
            instructor: 'Dr. Smith',
            schedule: 'MWF 10:00-11:00',
            capacity: 30,
            enrolled: 25,
            semester: 'Fall 2024',
            description: 'Basic programming concepts using Python',
            backgroundImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center',
            book: 'Python Programming: An Introduction to Computer Science by John Zelle'
          },
          {
            id: '2',
            code: 'MATH201',
            name: 'Calculus II',
            credits: 4,
            instructor: 'Dr. Johnson',
            schedule: 'TTh 14:00-16:00',
            capacity: 25,
            enrolled: 20,
            semester: 'Fall 2024',
            description: 'Advanced calculus concepts and applications',
            backgroundImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop&crop=center',
            book: 'Calculus: Early Transcendentals by James Stewart'
          }
        ],

        // Grades State
        grades: [
          {
            id: '1',
            studentId: '1',
            courseId: '1',
            grade: 'A',
            points: 4.0,
            semester: 'Fall 2024',
            assignments: [
              { name: 'Assignment 1', score: 95, maxScore: 100 },
              { name: 'Midterm', score: 88, maxScore: 100 },
              { name: 'Final Project', score: 92, maxScore: 100 }
            ]
          },
          {
            id: '2',
            studentId: '2',
            courseId: '2',
            grade: 'A+',
            points: 4.0,
            semester: 'Fall 2024',
            assignments: [
              { name: 'Quiz 1', score: 98, maxScore: 100 },
              { name: 'Midterm', score: 96, maxScore: 100 },
              { name: 'Final Exam', score: 94, maxScore: 100 }
            ]
          }
        ],

        // UI State
        theme: 'light',
        sidebarCollapsed: false,
        loading: false,
        error: null,
        searchQuery: '',
        searchResults: [],

        // Student Actions
        addStudent: (student) => set((state) => {
          state.students.push({
            ...student,
            id: Date.now().toString(),
            enrollmentDate: new Date().toISOString().split('T')[0],
            status: 'active',
            gpa: 0
          })
        }),

        updateStudent: (id, updates) => set((state) => {
          const index = state.students.findIndex(s => s.id === id)
          if (index !== -1) {
            Object.assign(state.students[index], updates)
          }
        }),

        deleteStudent: (id) => set((state) => {
          state.students = state.students.filter(s => s.id !== id)
          state.grades = state.grades.filter(g => g.studentId !== id)
        }),

        // Course Actions
        addCourse: (course) => set((state) => {
          state.courses.push({
            ...course,
            id: Date.now().toString(),
            enrolled: 0
          })
        }),

        updateCourse: (id, updates) => set((state) => {
          const index = state.courses.findIndex(c => c.id === id)
          if (index !== -1) {
            Object.assign(state.courses[index], updates)
          }
        }),

        deleteCourse: (id) => set((state) => {
          state.courses = state.courses.filter(c => c.id !== id)
          state.grades = state.grades.filter(g => g.courseId !== id)
        }),

        // Grade Actions
        addGrade: (grade) => set((state) => {
          state.grades.push({
            ...grade,
            id: Date.now().toString()
          })
        }),

        updateGrade: (id, updates) => set((state) => {
          const index = state.grades.findIndex(g => g.id === id)
          if (index !== -1) {
            Object.assign(state.grades[index], updates)
          }
        }),

        deleteGrade: (id) => set((state) => {
          state.grades = state.grades.filter(g => g.id !== id)
        }),

        // UI Actions
        toggleTheme: () => set((state) => {
          state.theme = state.theme === 'light' ? 'dark' : 'light'
        }),

        toggleSidebar: () => set((state) => {
          state.sidebarCollapsed = !state.sidebarCollapsed
        }),

        setLoading: (loading) => set((state) => {
          state.loading = loading
        }),

        setError: (error) => set((state) => {
          state.error = error
        }),

        // Computed getters
        getStudentById: (id) => {
          return get().students.find(s => s.id === id)
        },

        getCourseById: (id) => {
          return get().courses.find(c => c.id === id)
        },

        getGradesByStudent: (studentId) => {
          return get().grades.filter(g => g.studentId === studentId)
        },

        getGradesByCourse: (courseId) => {
          return get().grades.filter(g => g.courseId === courseId)
        },

        getStudentGPA: (studentId) => {
          const grades = get().getGradesByStudent(studentId)
          if (grades.length === 0) return 0
          const totalPoints = grades.reduce((sum, grade) => sum + grade.points, 0)
          return (totalPoints / grades.length).toFixed(2)
        },

        // Search Actions
        setSearchQuery: (query) => set((state) => {
          state.searchQuery = query
          if (query.trim() === '') {
            state.searchResults = []
            return
          }
          
          const results = []
          const lowerQuery = query.toLowerCase()
          
          // Search students
          state.students.forEach(student => {
            if (student.name.toLowerCase().includes(lowerQuery) || 
                student.email.toLowerCase().includes(lowerQuery) ||
                student.major.toLowerCase().includes(lowerQuery)) {
              results.push({ type: 'student', data: student })
            }
          })
          
          // Search courses
          state.courses.forEach(course => {
            if (course.name.toLowerCase().includes(lowerQuery) || 
                course.code.toLowerCase().includes(lowerQuery) ||
                course.instructor.toLowerCase().includes(lowerQuery)) {
              results.push({ type: 'course', data: course })
            }
          })
          
          state.searchResults = results
        }),

        clearSearch: () => set((state) => {
          state.searchQuery = ''
          state.searchResults = []
        })
      })),
      {
        name: 'academic-management-store',
        partialize: (state) => ({
          students: state.students,
          courses: state.courses,
          grades: state.grades,
          theme: state.theme
        })
      }
    ),
    { name: 'academic-management' }
  )
)

export default useStore