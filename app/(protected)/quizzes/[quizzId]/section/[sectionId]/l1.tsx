"use client";
import React, { useState } from 'react'
import MultiSelect from './MultiSelect'
import Parent from './Parent';

function Ldata({data,sectionId,tagsDistinct,defaultValues,userId}:any) {
    // sectionId={sectionId} tagsDistinct={allTags} defaultValues={fArr}  userId={userId}
    const [childMsg, setChildMsg] = React.useState(null)

  return (
    <div>
        <Parent data={data}  sectionId={sectionId} tagsDistinct={tagsDistinct} defaultValues={defaultValues}  userId={userId}/>
        
    </div>
  )
}

export default Ldata