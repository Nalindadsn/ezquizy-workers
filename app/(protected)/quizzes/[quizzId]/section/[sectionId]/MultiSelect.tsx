'use client';
import React, { startTransition, useState } from 'react';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import { Button } from '@/components/ui/button';
import { tagsUpdate } from '../../../actions/tagsUpdate';
import toast from 'react-hot-toast';
import Ldata from './l1';


// const MultiSelect = ({ tagsDistinct, defaultValues, userId, sectionId }: any) => {
  const MultiSelect = (props: any) => {

  let tagsAll: any = []
  props.tagsDistinct.map((x: any) => tagsAll.push({ label: x, value: x }))


  let def: any = []
  props.defaultValues.map((x: any) => def.push({ label: x, value: x }))


  const [value, setValue] = useState<Option[]>(def);


  let tags = value.map((item: any) => item.value);


  const OPTIONS: Option[] = tagsAll;
 
  const updateData = (e:any) => {

    startTransition(() => {

      tagsUpdate(e, props.userId, props.sectionId)
        .then((data: any) => {
          if (data.error) {
            toast.error(data.error);
          }

          if (data.success) {
            // toast.success("Updated Selected Tags!")
          }
        })
        .catch(() => toast.error("Something went wrong!"));
    });

  }
  return (
    <div className="w-full">

      <div className="flex gap-2 items-center">
        <MultipleSelector
          value={value}
          onChange={(e:any) => updateData(e)}
          defaultOptions={OPTIONS}
          placeholder="Select frameworks you like..."
          emptyIndicator={
            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
              no results found.
            </p>
          }
        />
      </div>


    </div>

  );
};

export default MultiSelect;