import Link from "next/link";
import Quiz from "./_components/Quiz";
// import { client } from "@/sanity/lib/client";
// import { fetchUsers } from "../(auth)/actions/fetchUsers";
import { Button } from "@/components/ui/button";
import { fetchById } from "../../../actions/list";
import { Separator } from "@/components/ui/separator";
import Arr from "./Arr";
import { CheckIcon, Pen, Play, RefreshCcw, StopCircleIcon } from "lucide-react";

import MultiSelect from "./MultiSelect";
import { Badge } from "@/components/ui/badge";
import Ldata from "./l1";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

async function getData() {
  const data: any = [];
  return data;
}

const page = async ({ params, searchParams }: any) => {
  const questions = await getData();
  const userId = "6717bf00391027592347633a";

  const items: any = await fetchById(
    (
      await params
    )?.quizzId,
    (
      await params
    )?.sectionId,
    userId
  );

  return <div className="">{JSON.stringify(items)}</div>;
};

export default page;
