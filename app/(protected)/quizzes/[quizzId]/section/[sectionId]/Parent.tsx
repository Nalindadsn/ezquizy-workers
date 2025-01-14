"use client"
import React from 'react'
import Child from './Child'

function Parent({data,sectionId,tagsDistinct,defaultValues,userId}:any) {
    const [childMsg, setChildMsg] = React.useState<any | null>(null)
  return (
    <div>
      <div className="h-1.5">{childMsg!==null&& data.length!==childMsg?.data.length&&<div className='w-full '>
      <div className='h-1.5 w-full bg-pink-100 overflow-hidden'>
        <div className='progress w-full h-full bg-pink-500 left-right'></div>
      </div>
</div>}</div>
        <Child fromChild={setChildMsg}  sectionId={sectionId} tagsDistinct={tagsDistinct} defaultValues={defaultValues}  userId={userId}/>
        {/* 
{JSON.stringify(data)} */}
{/* {childMsg!==null && data.length!==childMsg?.data.length} */}


{/* {childMsg.length!==data.length&&"Loading..."} */}

    </div>
  )
}

export default Parent