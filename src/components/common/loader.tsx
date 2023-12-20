import React from 'react'

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur confirm-dialog">
    <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
     
        <div
          role="status"
          className=" absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 "
        >
          <div className="relative">
            <div className="w-20 h-20 border-red-200 border-2 rounded-full"></div>
            <div className="w-20 h-20 border-red-700 border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
          </div>

          <div className="relative">
            <div className="w-10 h-10 border-red-200 border-2 rounded-full"></div>
            <div className="w-10 h-10 border-red-700 border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
          </div>

          <div className="relative">
            <div className="w-5 h-5 border-red-200 border-2 rounded-full"></div>
            <div className="w-5 h-5 border-red-700 border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loader