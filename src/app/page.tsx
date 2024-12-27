import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex gap-4">
      <Button asChild variant="link">
        <Link href={"/client"}>client</Link>
      </Button>
      <Button asChild variant="link">
        <Link href={"/employee"}>employee</Link>
      </Button>
    </div>
  );
};
export default Page;
