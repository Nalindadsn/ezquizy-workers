"use client";

import { ArrowBigRight, ArrowBigRightDash } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation'
import { Badge } from '../ui/badge';
import { usePathname } from "next/navigation";

export const SecondNav = ({data}:{data?:any}) => {
  const params = useParams<{ id: string;poolId:string;userId?:string }>()
  const currentSubAcc: any = params?.id ? data.filter((s: any) => s.id === params.id) : null
  const currentPool: any = params?.poolId ? currentSubAcc[0]?.pool.filter((s: any) => s.id === params.poolId) : null
  const router = usePathname();

  return (
    <nav className="md:pl-[320px] border-b text-right  flex justify-end  px-4 py-2  shadow-sm">
      {/* {JSON.stringify(currentSubAcc)}<hr/>------------
      {JSON.stringify(currentPool)} */}
      {!params?.id || !params?.poolId || (params?.id && params?.poolId && params?.userId ?"-":"_") }
      {
        params?.id ?<Badge className='bg-indigo-600 hover:bg-indigo-700'><Link href={`/org/${currentSubAcc[0]?.id}`}>{currentSubAcc[0]?.name}</Link></Badge>:""
      }
      {
        params?.poolId ? <><ArrowBigRightDash /><Badge>{currentPool[0]?.name}</Badge></>:""
      }
      {!params?.id && !params?.poolId && !params?.userId ?<Badge><Link href={router}>{router.substring(router.lastIndexOf("/") + 1, router.length)}</Link></Badge>:""}
      </nav>
  );
};
