import LayoutPr from "./layoutPr";
import { Suspense } from "react";
// import { Providers } from "@/components/providers";

interface ProtectedLayoutProps {
  children: React.ReactNode;
  props?: any;
}

const ProtectedLayout = (props: any) => {
  return (
    <>
      {/* <Providers> */}
      <Suspense fallback={"Loading... "}>{/* <Sidebar /> */}</Suspense>

      <div className="md:pl-[310px] md:p-5">
        <div className="p-0">
          <Suspense fallback={"Loading... "}>{props.children}</Suspense>
        </div>
      </div>
      {/* </Providers> */}
    </>
  );
};

export default ProtectedLayout;
