"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="md:pl-[320px] bg-secondary flex justify-between items-center  px-4 py-2  shadow-sm">
      <div className="flex gap-x-2">
        <div className="md:hidden ml-12 pt-2 font-bold">
          Quiz<span>Master</span>
        </div>
      </div>
    </nav>
  );
};
