import { Suspense } from "react";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="p-0">
      <Suspense fallback={"Loading... "}>{children}</Suspense>
    </div>
  );
};

export default ProtectedLayout;
