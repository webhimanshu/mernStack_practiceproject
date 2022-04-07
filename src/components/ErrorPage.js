import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className=''>
 <h1>404 ErrorPage page not found</h1>
 <Link  to="/">Go to homepage</Link>
    </div>
  )
}

export default ErrorPage