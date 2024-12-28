import { useState } from "react";
import { Button } from "../ui/button";

interface RowForNumberOptionsProps {
  label: string;
  sublabel: string;
  value: number;
  onChange: (value: number) => void;
}

export const RowForNumberOptions = ({
  label,
  sublabel,
  value,
  onChange,
}: RowForNumberOptionsProps) => {
  const [inputValue, setInputValue] = useState(value);

  const handleSave = () => {
    console.log(`Saving ${inputValue}`);
    onChange(inputValue);
  };

  return (
    <div className="w-full flex p-5 h-36 ">
      <div className="flex flex-col text-left justify-center">
        <h2 className="text-lg font-semibold">{label}</h2>
        <p className="text-sm text-gray-500">{sublabel}</p>
      </div>
      <div className="flex flex-col ml-auto justify-center text-center items-center w-36">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(Number(e.target.value))}
          className="border rounded px-3 py-1 text-center"
        />
        <Button onClick={handleSave} className="mt-2 w-20">
          Save
        </Button>
      </div>
    </div>
  );
};