import React from 'react'
import { Link } from 'react-router-dom'
function Sidebar() {
  return (
    <div className='side'>

        <h1 className='wel'>Welcome Admin</h1>
        <ul>
            <Link to='/dashboard'><li>Dashboard</li></Link><br></br>
            <Link to='/conference'><li>Conferences</li></Link><br></br>
            <Link to='/papers'><li>Papers</li></Link><br></br>
            <Link to='/registrations'><li>Registrations</li></Link><br></br>
        </ul>
        <h1 className='logout'>Logout</h1>
    </div>
  )
}

export default Sidebar