"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";

import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QuizCreateSchema } from "@/schemas";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { settings } from "@/components/actions/settings";
import { create } from "../actions/create";

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { linkSync } from "fs";

import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { List, Loader2, Plus } from "lucide-react";
const JsonA = ({ data }: { data?: any }) => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  // const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  // alert(JSON.stringify(id))

  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="text-white hover:text-white bg-[#050708] hover:bg-[#050708]/90   font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2"
          >
            <List className="mr-2 h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Quiz</DialogTitle>
            <DialogDescription>
              {/* Make Pin to This profile here. Click save when youre done. */}
              {/* <div className=" p-1 bg-gray-800 text-white">Name: {data?.name}<br/>Nic: {data?.nic}<br/>Email: {data?.email}</div>  */}
            </DialogDescription>
          </DialogHeader>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem iusto at
          maxime, delectus harum tempora, consequatur id a beatae, ab fuga.
          Nostrum, ipsum. Commodi natus odit cumque neque dignissimos nemo?
        </DialogContent>
      </Dialog>
    </>
  );
};
export default JsonA;
