"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";

import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPoolSchema } from "@/schemas";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { UserRole } from "@prisma/client";
import { linkSync } from "fs";
import { settings } from "../actions/settings";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pin } from "lucide-react";
const AddTodo = ({ pool, id, data }: { pool: any; id: any; data: any }) => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof UserPoolSchema>>({
    resolver: zodResolver(UserPoolSchema),
    defaultValues: {
      userId: undefined,
      note: undefined,
      poolId: undefined,
    },
  });

  // alert(JSON.stringify(id))

  const onSubmit = (values: z.infer<typeof UserPoolSchema>) => {
    startTransition(() => {
      setError("");
      setSuccess("");
      settings(values, id)
        .then((data: any) => {
          if (data.error) {
            toast.error(data.error);
          }
          if (data.success) {
            update();

            toast.success(data.success);
            // form.reset()
          }
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-white hover:text-white bg-[#050708] hover:bg-[#050708]/90   font-medium rounded-lg text-sm px-2 h-8 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2"
        >
          <Pin className="w-4 h-4  rotate-45" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Pin User</DialogTitle>
          <DialogDescription>
            Make Pin to This profile here. Click save when youre done.
            <div className=" p-1 bg-gray-800 text-white">
              Name: {data?.name}
              <br />
              Nic: {data?.nic}
              <br />
              Email: {data?.email}
            </div>
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2">
              {/* {JSON.stringify(pool)} */}
              <FormField
                control={form.control}
                name="poolId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pools</FormLabel>
                    <FormControl>
                      <select
                        className="w-full p-2 border "
                        {...field}
                        disabled={isPending}
                      >
                        <option value="">-Select-</option>

                        {pool.map((p: any) => (
                          <option key={p.id} value={p.id}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                      {/* <Input
                        {...field}
                        placeholder="0000.00"
                        disabled={isPending}
                      /> */}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Text Here..."
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
              <Button disabled={isPending} type="submit">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default AddTodo;
