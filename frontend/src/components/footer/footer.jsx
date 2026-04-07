import React from 'react'

const footer = () => {
  return (
    <div>
        <div className="hidden md:flex justify-end gap-6 px-10 py-4 border-t border-gray-100 text-xs text-gray-400">
        <a href="#" className="hover:text-gray-600">Privacy Policy</a>
        <a href="#" className="hover:text-gray-600">Terms of Service</a>
        <a href="#" className="hover:text-gray-600">Help Center</a>
      </div>
    </div>
  )
}

export default footer