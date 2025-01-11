import React from "react";
import MenuOptions from "./menu-options";
import { Navbar } from "./navbar";
import { getData } from "./routeData";
import { SecondNav } from "./secondNav";

type Props = {
  id: string;
  type: "agency" | "subaccount";
};

const Sidebar = async (data?: any, cId?: any) => {
  const dataU: any = await getData("6717bf00391027592347633a");

  return (
    <>
      <Navbar />
      <SecondNav data={dataU} />

      <MenuOptions defaultOpen={true} data={data} cId={cId} dataV={dataU} />
      <MenuOptions dataV={dataU} />
    </>
  );
};

export default Sidebar;
