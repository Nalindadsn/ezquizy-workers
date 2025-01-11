"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

export const Navbar = ({
  dataV,
  isLoading,
}: {
  dataV?: any;
  isLoading?: any;
}) => {
  const pathname = usePathname();

  return (
    <nav className=" shadow-md py-5 border-b-default border-solid border-gray-200 z-10 w-full bg-inherit flex justify-between">
      <div className="flex gap-x-2">
        <div className="ml-12 pt-2 font-bold">
          Quiz<span>Master</span>
        </div>
      </div>
      <div className="mr-2 rounded-full"></div>
    </nav>
  );
};
