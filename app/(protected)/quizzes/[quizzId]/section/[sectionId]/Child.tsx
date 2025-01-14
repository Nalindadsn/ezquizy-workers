'use client';
import React, { startTransition, useState } from 'react';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import { Button } from '@/components/ui/button';
import { tagsUpdate } from '../../../actions/tagsUpdate';
import toast from 'react-hot-toast';
import Ldata from './l1';
import { useRouter } from 'next/navigation';


function Child(props:any) {


    let tagsAll: any = []
    props.tagsDistinct.map((x: any) => tagsAll.push({ label: x, value: x }))
  
  
    let def: any = []
    props.defaultValues.map((x: any) => def.push({ label: x, value: x }))
  
  
    const [value, setValue] = useState<Option[]>(def);
  
  
    let tags = value.map((item: any) => item.value);
  
  
    const [message, setMessage] = useState("")
    const OPTIONS: Option[] = tagsAll;
  // const [pr, setPr] = useState(def)
    const updateData = (e:any) => {
  
      startTransition(() => {
        tagsUpdate(e, props.userId, props.sectionId)
          .then((data: any) => {
            if (data.error) {
              toast.error(data.error);
              setMessage("err")
              props.fromChild(null)
            }
  
            if (data.success) {
              
              setMessage("")
              // props.fromChild(null)
              // toast.success("Updated Selected Tags!")
            }
          })
          .catch(() => {
            toast.error("Something went wrong!")

            setMessage("err")
            props.fromChild(null)
            
          });
      });
  
    }
    const [loading, setLoading] = useState(false)
    const pr=(e:any)=>{
      props.fromChild({data:e})
    }
    
    
    return (
      <div className="w-full">
  
        <div className="flex gap-2 items-center">
          <MultipleSelector
            value={value}
            onChange={(e:any) => {updateData(e);pr(e)}}
            defaultOptions={OPTIONS}
            placeholder="Select tags..."
            emptyIndicator={
              <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                no results found.
              </p>
            }
          />
        </div>
  
  
      </div>
  
    );
}

export default Child