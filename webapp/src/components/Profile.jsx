import { motion } from 'framer-motion'
import { User, Mail, Phone, MapPin, Calendar, Shield, Edit } from 'lucide-react'

export default function Profile() {
  const adminProfile = {
    name: 'John Admin',
    email: 'admin@university.edu',
    phone: '+1 (555) 123-4567',
    role: 'System Administrator',
    department: 'Information Technology',
    joinDate: '2020-01-15',
    address: '123 University Ave, Campus City',
    permissions: ['User Management', 'Course Management', 'System Settings', 'Reports Access']
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-black">Profile</h1>
          <p className="text-black mt-1">Manage your account information</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-sm border border-blue-200 p-6 text-center">
            <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-xl font-bold text-black mb-2">{adminProfile.name}</h2>
            <p className="text-black mb-4">{adminProfile.role}</p>
            <div className="flex items-center justify-center text-sm text-black">
              <Shield className="w-4 h-4 mr-1" />
              Administrator
            </div>
          </div>
        </motion.div>

        {/* Details Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl shadow-sm border border-green-200 p-6">
            <h3 className="text-lg font-semibold text-black mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-black mr-3" />
                <div>
                  <p className="text-sm text-black">Email</p>
                  <p className="font-medium text-black">{adminProfile.email}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-black mr-3" />
                <div>
                  <p className="text-sm text-black">Phone</p>
                  <p className="font-medium text-black">{adminProfile.phone}</p>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-black mr-3" />
                <div>
                  <p className="text-sm text-black">Address</p>
                  <p className="font-medium text-black">{adminProfile.address}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-black mr-3" />
                <div>
                  <p className="text-sm text-black">Join Date</p>
                  <p className="font-medium text-black">{new Date(adminProfile.joinDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Permissions Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl shadow-sm border border-purple-200 p-6"
      >
        <h3 className="text-lg font-semibold text-black mb-4">Permissions & Access</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {adminProfile.permissions.map((permission, index) => (
            <div key={index} className="flex items-center p-3 bg-white rounded-lg border">
              <Shield className="w-4 h-4 text-green-500 mr-2" />
              <span className="text-sm font-medium text-black">{permission}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}