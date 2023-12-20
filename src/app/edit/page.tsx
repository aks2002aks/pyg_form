// http://localhost:3000/create?formid=184y418481491y324y

"use client";

import React, { Suspense } from 'react'
import EditFormPageSkeleton from './editFormPageSkeleton';
import EditFormPage from './editFormPage';

const Page = () => {
  return (
    <div>
       {/* <Suspense fallback={  <EditFormPageSkeleton/>}> */}
          <EditFormPage/>
        {/* </Suspense> */}
    </div>
  )
}

export default Page
