"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export const SuccessPage: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl text-center font-bold mb-4">
        Zamówienie złożone pomyślnie!
      </h2>
      <div className="flex justify-center p-5 gap-5">
        <Button variant="link" asChild>
          <Link href="/client">Powrót do strony głównej</Link>
        </Button>
      </div>
    </div>
  );
};
