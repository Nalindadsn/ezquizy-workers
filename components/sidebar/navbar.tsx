"use client";

export const Navbar = ({
  dataV,
  isLoading,
}: {
  dataV?: any;
  isLoading?: any;
}) => {
  console.log(dataV, isLoading);
  return (
    <nav className="md:pl-[320px]  flex justify-between items-center  px-4 py-2  shadow-sm">
      <div className="flex gap-x-2">
        <div className="md:hidden ml-12 pt-2 font-bold">QuizMaster</div>
      </div>
    </nav>
  );
};
