"use client";
import React from "react";
import { Button } from "@/components/ui/button";

interface OverviewPageProps {
  sendNext: () => void;
  sendBack: () => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({
  sendNext,
  sendBack,
}) => {
  return (
    <div>
      <Button onClick={sendBack} variant="outline">
        Back
      </Button>
      <Button onClick={sendNext} className="ml-2">
        Next
      </Button>
    </div>
  );
};
