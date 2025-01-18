import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
import { FileWarning, ListStart, Plane, Play, Send, Star } from "lucide-react";
export default function PokemonCard({ data }: IPokemon) {
  return (
    <>
      <Card key={data?.id}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium"></CardTitle>
          <div className="text-right">
            {data?.quizzesSection.length} Sections
            <br />
          </div>
        </CardHeader>
        <CardContent>
          <p>
            Article: {data?.atNo} | {data?.examination}
          </p>
          <Link key={data?.id} href={`/quizzes/${data?.id}`} className="w-full">
            <h3 className="text-2xl font-bold">{data?.name}</h3>

            {/* <span className="text-xs text-gray-500">id: {data?.id}</span> */}
          </Link>

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
                  <p className=" text-xs text-muted-foreground">
                    {x?.questions.length} Questions
                  </p>
                </div>

                <div className="">
                  <Button asChild className="h-6 p-0 px-2">
                    <Link href={`/quizzes/${data?.id}/section/${x?.id}`}>
                      start
                      <Play className="w-3 h-3 ml-2" />
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
