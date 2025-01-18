import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
interface IPokemon {
  data: any;
  orgId: any;
}
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  ArrowBigRightDash,
  Edit,
  FileWarning,
  ListStart,
  Plane,
  Play,
  Send,
  Star,
  Trash,
} from "lucide-react";
import Delete from "./delete";
import EditQuiz from "./edit";
import AddSection from "./addSection";
import DeleteSection from "./deleteSection";
import EditSection from "./editSection";
export default function PokemonCard({ data, orgId }: IPokemon) {
  return (
    <>
      <Card key={data?.id}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium"></CardTitle>
          <div className="text-right flex gap-2 items-center">
            {data?.quizzesSection.length} Sections
            <AddSection obj={data} />
          </div>
        </CardHeader>
        <CardContent>
          <div className=" flex items-center text-2xl font-bold">
            <Link key={data?.id} href={`/quizzes/${data?.id}`} className="">
              {data?.name}
            </Link>
            <div className="flex gap-1 ml-2  items-center ">
              <EditQuiz data={data} />

              <Delete todo={data?.id} varient="small" />
            </div>
          </div>

          {/* <span className="text-xs text-gray-500">id: {data?.id}</span> */}

          {data?.quizzesSection.length < 1 && (
            <div className="flex justify-center items-center  text-center mt-5">
              <FileWarning /> No data
            </div>
          )}
          {data?.quizzesSection.map((x: any) => {
            return (
              <div
                key={x?.id}
                className="flex gap-2 border  mb-1 p-2 items-center"
              >
                <div className="w-full ">
                  {x?.name}
                  <p className=" text-xs text-muted-foreground"></p>
                  {x?.allTags.map((i: any) => {
                    return (
                      <Badge
                        key={i}
                        className="mr-1"
                        variant={
                          x?.defaultsTags.includes(i) ? "default" : "outline"
                        }
                      >
                        {i}
                      </Badge>
                    );
                  })}

                  {/* <Badge></Badge> */}
                </div>

                <div className="flex gap-1">
                  {/* {JSON.stringify(x)} */}
                  <EditSection obj={data} data={x} />

                  <DeleteSection todo={x?.id} varient="small" />
                  <Button asChild className="h-6 p-0 px-2">
                    <Link
                      href={`/org/${orgId}/quizzes/${data?.id}?section=${x?.id}`}
                    >
                      {/* {`/org/${orgId}/quizzes/${data?.id}/section/${x?.id}`}
                {`/quizzes/${data?.id}`} */}
                      Go
                      <ArrowBigRightDash className="w-3 h-3 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </>
  );
}
