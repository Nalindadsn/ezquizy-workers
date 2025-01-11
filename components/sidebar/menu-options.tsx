"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import {
  Book,
  ChevronsUpDown,
  CircleDollarSign,
  Coins,
  Compass,
  LayoutDashboardIcon,
  List,
  Menu,
  NotepadText,
  Pen,
  Settings,
  Tag,
  User,
} from "lucide-react";
import clsx from "clsx";
import { AspectRatio } from "../ui/aspect-ratio";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { usePathname } from "next/navigation";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { Separator } from "../ui/separator";
import { icons } from "@/lib/constants";

import CustomModal from "../global/custom-modal";
import { useParams } from "next/navigation";
import { Navbar } from "./navbar";
interface SubAcc {
  name: string;
  id: string;
}
const MenuOptions = ({
  user,
  defaultOpen,

  dataV,
}: {
  details?: any;
  id?: any;
  sidebarLogo?: any;
  sidebarOpt?: any;
  subAccounts?: any;
  user?: any;
  defaultOpen?: any;
  data?: any;
  cId?: any;
  dataV: any;
}) => {
  const params = useParams<{ id: string }>();
  const sidebarOptt: any = params?.id
    ? [
        //   {
        //   id: 1,
        //   link: "/org",
        //   icon: "Org",
        //   name: "Sub Accounts"
        // },

        {
          id: 1,
          link: `/org/${params?.id}/dashboard`,
          icon: "Dashboard",
          name: "Dashboard",
        },
        {
          id: 5,
          link: `/org/${params?.id}/quizzes`,
          icon: "Quizzes",
          name: "Quizzes",
        },
      ]
    : [
        {
          id: 1,
          link: "/dashboard",
          icon: "Dashboard",
          name: "Dashboard",
        },
        //   {
        //   id: 2,
        //   link: "/users",
        //   icon: "User",
        //   name: "Users"
        // },
        //   {
        //   id: 3,
        //   link: "/org",
        //   icon: "Org",
        //   name: "Sub Accounts"
        // },
        {
          id: 2,
          link: "/quizzes",
          icon: "Org",
          name: "quizzes",
        },
      ];

  // const { setOpen }: any = useModal();
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  const openState = useMemo(
    () => (defaultOpen ? { open: true } : {}),
    [defaultOpen]
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // let [dataV, setDataV] = useState([])
  // const [isLoading, setLoading] = useState(true)

  // useEffect(() => {
  //   fetch('/api/subAcc')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setDataV(data)
  //       setLoading(false)
  //     })
  // }, [])

  if (!isMounted) return;

  const currentSubAcc: any = params?.id
    ? dataV.filter((s: any) => s.id === params.id)
    : null;

  return (
    <>
      <Sheet modal={false} {...openState}>
        <SheetTrigger
          asChild
          className="absolute left-4 top-4 z-[100] md:!hidden  felx"
        >
          <Button variant="outline" size={"icon"}>
            <Menu />
          </Button>
        </SheetTrigger>

        <SheetContent
          showX={!defaultOpen}
          side={"left"}
          className={clsx(
            "bg-background/80 backdrop-blur-xl fixed top-0 border-r-[1px] p-6   overflow-y-auto",
            {
              "hidden md:inline-block z-0 w-[300px]": defaultOpen,
              "inline-block md:hidden z-[100] w-full": !defaultOpen,
            }
          )}
        >
          <div>
            <AspectRatio ratio={100 / 5} className="font-bold text-indigo-600">
              <Link href={`/`}>QuizMaster</Link>
            </AspectRatio>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="w-full border-indigo-600  my-4 flex items-center justify-between py-8 border"
                  variant="ghost"
                >
                  <div className="flex items-center text-left gap-2 font-bold">
                    <Compass />
                    <div className="flex flex-col">
                      {currentSubAcc !== null ? (
                        currentSubAcc.length > 0 ? (
                          currentSubAcc[0].name
                        ) : (
                          "..."
                        )
                      ) : (
                        <>All Accounts</>
                      )}
                    </div>
                  </div>
                  <div>
                    <ChevronsUpDown
                      size={16}
                      className="text-muted-foreground"
                    />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 h-80 mt-1 z-[200] mb-2">
                <Command className="rounded-lg">
                  <CommandInput placeholder="Search Accounts..." />
                  <CommandList className="pb-16">
                    <CommandEmpty> No results found</CommandEmpty>
                    {(user?.role === "AGENCY_OWNER" ||
                      user?.role === "AGENCY_ADMIN") &&
                      user?.Agency && (
                        <CommandGroup heading="Agency">
                          <CommandItem className="!bg-transparent my-2 text-primary broder-[1px] border-border p-2 rounded-md hover:!bg-muted cursor-pointer transition-all">
                            {defaultOpen ? (
                              <Link
                                href={`/agency/${user?.Agency?.id}`}
                                className="flex gap-4 w-full h-full"
                              >
                                <div className="relative w-16">
                                  Quiz<span>Master</span>
                                </div>
                                <div className="flex flex-col flex-1">
                                  {user?.Agency?.name}
                                  <span className="text-muted-foreground">
                                    {user?.Agency?.address}
                                  </span>
                                </div>
                              </Link>
                            ) : (
                              <SheetClose asChild>
                                <Link
                                  href={`/agency/${user?.Agency?.id}`}
                                  className="flex gap-4 w-full h-full"
                                >
                                  <div className="relative w-16">
                                    {/* <Image
                                    src={user?.Agency?.agencyLogo}
                                    alt="Agency Logo"
                                    fill
                                    className="rounded-md object-contain"
                                  /> */}
                                  </div>
                                  <div className="flex flex-col flex-1">
                                    {user?.Agency?.name}
                                    <span className="text-muted-foreground">
                                      {user?.Agency?.address}
                                    </span>
                                  </div>
                                </Link>
                              </SheetClose>
                            )}
                          </CommandItem>
                        </CommandGroup>
                      )}
                    <CommandGroup heading="Switch Accounts">
                      {/* {console.log(data?.data)} */}
                      <div className="flex justify-end mb-2 w-full">
                        <Button asChild className="h-5 md:h-5 rounded-md px-3">
                          <Link href="/org" className="">
                            All Sub Accounts
                          </Link>
                        </Button>
                      </div>
                      {dataV !== null
                        ? dataV.map((subaccount: any) => (
                            <CommandItem key={subaccount.id}>
                              <Link
                                href={`/org/${subaccount.id}/dashboard`}
                                className="flex gap-1 w-full h-full"
                              >
                                {/* <div className="relative w-16">
                                  <Image
                                    src={subaccount.subAccountLogo}
                                    alt="subaccount Logo"
                                    fill
                                    className="rounded-md object-contain"
                                  />
                                </div> */}
                                <div className="flex flex-col flex-1">
                                  {subaccount.name}
                                  <span className="text-muted-foreground">
                                    {subaccount.address}
                                  </span>
                                </div>
                              </Link>
                            </CommandItem>
                          ))
                        : "No Accounts"}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <p className="text-muted-foreground text-xs mb-2">MENU LINKS</p>
            <Separator className="mb-4" />
            <nav className="relative">
              <Command className="rounded-lg overflow-visible bg-transparent">
                <CommandInput placeholder="Search..." className="mb-2" />
                <CommandList className="py-4 overflow-visible">
                  <CommandEmpty>No Results Found</CommandEmpty>
                  <CommandGroup className="overflow-visible">
                    {sidebarOptt.map((sidebarOptions: any) => {
                      let val;
                      const result = icons.find(
                        (icon: any) => icon.value === sidebarOptions.icon
                      );
                      if (result) {
                        val = <result.path />;
                      }
                      return (
                        <CommandItem
                          key={sidebarOptions.id}
                          className={
                            sidebarOptions.link == pathname
                              ? "bg-gray-100 text-gray-800 font-bold "
                              : ""
                          }
                        >
                          {(() => {
                            switch (sidebarOptions?.icon) {
                              case "Dashboard":
                                return (
                                  <LayoutDashboardIcon
                                    className={`w-6 h-6 text-white ${
                                      sidebarOptions.link == pathname
                                        ? "bg-indigo-700 "
                                        : "bg-indigo-600"
                                    } rounded-full p-1 mr-1`}
                                  />
                                );

                              case "Expenses":
                                return (
                                  <Coins
                                    className={`w-6 h-6 text-white ${
                                      sidebarOptions.link == pathname
                                        ? "bg-indigo-700 "
                                        : "bg-indigo-600"
                                    } rounded-full p-1 mr-1`}
                                  />
                                );

                              case "Attendance":
                                return (
                                  <Pen
                                    className={`w-6 h-6 text-white ${
                                      sidebarOptions.link == pathname
                                        ? "bg-indigo-700 "
                                        : "bg-indigo-600"
                                    } rounded-full p-1 mr-1`}
                                  />
                                );

                              case "Income":
                                return (
                                  <CircleDollarSign
                                    className={`w-6 h-6 text-white ${
                                      sidebarOptions.link == pathname
                                        ? "bg-indigo-700 "
                                        : "bg-indigo-600"
                                    } rounded-full p-1 mr-1`}
                                  />
                                );

                              case "Pool":
                                return (
                                  <Tag
                                    className={`w-6 h-6 text-white ${
                                      sidebarOptions.link == pathname
                                        ? "bg-indigo-700 "
                                        : "bg-indigo-600"
                                    } rounded-full p-1 mr-1`}
                                  />
                                );

                              case "Quizzes":
                                return (
                                  <NotepadText
                                    className={`w-6 h-6 text-white ${
                                      sidebarOptions.link == pathname
                                        ? "bg-indigo-700 "
                                        : "bg-indigo-600"
                                    } rounded-full p-1 mr-1`}
                                  />
                                );

                              case "Courses":
                                return (
                                  <Book
                                    className={`w-6 h-6 text-white ${
                                      sidebarOptions.link == pathname
                                        ? "bg-indigo-700 "
                                        : "bg-indigo-600"
                                    } rounded-full p-1 mr-1`}
                                  />
                                );

                              case "Settings":
                                return (
                                  <Settings
                                    className={`w-6 h-6 text-white ${
                                      sidebarOptions.link == pathname
                                        ? "bg-indigo-700 "
                                        : "bg-indigo-600"
                                    } rounded-full p-1 mr-1`}
                                  />
                                );

                              case "Org":
                                return (
                                  <List
                                    className={`w-6 h-6 text-white ${
                                      sidebarOptions.link == pathname
                                        ? "bg-indigo-700 "
                                        : "bg-indigo-600"
                                    } rounded-full p-1 mr-1`}
                                  />
                                );

                              case "User":
                                return (
                                  <User
                                    className={`w-6 h-6 text-white ${
                                      sidebarOptions.link == pathname
                                        ? "bg-indigo-700 "
                                        : "bg-indigo-600"
                                    } rounded-full p-1 mr-1`}
                                  />
                                );
                              default:
                                return (
                                  <i
                                    className={`w-6 h-6 text-white ${
                                      sidebarOptions.link == pathname
                                        ? "bg-indigo-700 "
                                        : "bg-indigo-600"
                                    } rounded-full p-1 mr-1`}
                                  />
                                );
                            }
                          })()}

                          {/* <i className={`w-6 h-6 text-white bg-indigo-600 rounded-full p-1 mr-1`}/> */}
                          <Link
                            href={sidebarOptions.link}
                            className="w-full cursor-pointer"
                          >
                            {/* {val} */}
                            <span>{sidebarOptions.name}</span>
                          </Link>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MenuOptions;
