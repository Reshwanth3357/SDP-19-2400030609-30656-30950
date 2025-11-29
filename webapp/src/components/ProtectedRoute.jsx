import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, requiredRole }) => {
  const userRole = localStorage.getItem('userRole')
  
  if (!userRole) {
    return <Navigate to="/login" replace />
  }
  
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

export default ProtectedRoute