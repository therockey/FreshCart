"use client";
import MainContent from "@/components/cart/checkout/MainContent";
import { useEffect, useState } from "react";

const Page = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("ty skurwysynie zjebany");
  }, [count]);
  return (
    <>
      {count}
      <button onClick={() => setCount(count + 1)}>Click me!</button>
      <MainContent />
    </>
  );
};

export default Page;
