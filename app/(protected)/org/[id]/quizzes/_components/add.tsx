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
import { Loader2, Plus } from "lucide-react";
const Add = (id?: any, initialData?: any) => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  // const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof QuizCreateSchema>>({
    resolver: zodResolver(QuizCreateSchema),
    defaultValues: {
      name: id ? id.initialData?.name : undefined,
      description: id ? id.initialData?.description : undefined,
      country: id ? id.initialData?.country : undefined,
    },
  });

  // alert(JSON.stringify(id))

  const [open, setOpen] = useState(false);
  const onSubmit = (values: z.infer<typeof QuizCreateSchema>) => {
    startTransition(() => {
      // setError("");
      // setSuccess("");
      create(values, id)
        .then((data: any) => {
          if (data.error) {
            toast.error(data.error);
          }
          if (data.success) {
            //   update();

            toast.success(data.success);
            setOpen(false);
          }
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="text-white hover:text-white bg-[#050708] hover:bg-[#050708]/90   font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2"
          >
            <Plus className="w-4 h-4" /> Create
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

          <Form {...form}>
            <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quizz Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder=" Name"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a little bit about quizz"
                          className="resize-none"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quizz Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder=" country"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              {/* <Button
            disabled={isPending}
            type="submit"
          >
            Save
          </Button> */}
              <DialogFooter>
                <Button
                  disabled={isPending}
                  className="flex items-center"
                  type="submit"
                >
                  {isPending && (
                    <Loader2 className="mr-2 h-3 w-3 animate-spin text-white" />
                  )}{" "}
                  Quiz Create
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default Add;
