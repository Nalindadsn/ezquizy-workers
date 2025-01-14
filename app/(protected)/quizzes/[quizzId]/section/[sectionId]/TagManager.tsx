"use client";

import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";

export default function TagManager(props:any) {
  const [tags, setTags] = useState<any | undefined>({});

  const tagManage = useCallback(() => {
    setTags((prev:any) => {      
      const dataTag:any =  {data:"test8"} ;
      localStorage.setItem("tags", JSON.stringify(dataTag));
      return dataTag;
    });
  }, []);

  useEffect(() => {
    if (typeof window === undefined) return;
    setTags(localStorage?.getItem("tags"));
    // tagManage()
  }, [tags]);
const tagsArray=typeof tags=="object"?tags: JSON.parse(tags)




// props.fromChild(tagsArray)
  return <>
  <Button onClick={tagManage}>{JSON.stringify(tagsArray)}{tagsArray?.data}</Button></>;
}