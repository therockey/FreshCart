import { ModeToggle } from "@/components/ui/custom/mode-toggle";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ModeToggle />
      {children}
    </>
  );
};

export default Layout;
