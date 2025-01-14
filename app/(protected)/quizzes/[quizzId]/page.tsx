import React from 'react'
import { fetchByIdQ } from '../actions/list'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

async function page({params}:any) {
    
    const items: any = await fetchByIdQ(params?.quizzId)
  return (
    <div className='p-5 md:p-0'>
        <h1 className='text-5xl font-bold mb-6'>{items?.name}</h1>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
{items?.quizzesSection.map((item:any)=>{
    return <Link key={item?.id} href={`/quizzes/${params?.quizzId}/section/${item?.id}`}><Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm font-medium">
        
      </CardTitle>
      <div className='text-right'>

      {item?.type}<br/>
     {item?.questions.length} questions
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{item?.name}</div>
      <p className="text-xs text-muted-foreground">
        {((item?.quizResult.length>0?item?.quizResult[item?.quizResult.length-1].correctAnswers:0)/item?.questions.length*100).toFixed(2)}
       % from last attempt
      </p>
    </CardContent>
  </Card></Link>
})}

    
  </div>
    </div>
  )
}

export default page