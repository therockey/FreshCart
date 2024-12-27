"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface LoyaltyProgSettings {
  greedy: boolean;
  cumulateUntil: number;
  useFreeShipping: boolean;
  switchOffProg: boolean;
}

enum BooleanOptions {
  greedy = "greedy",
  useFreeShipping = "useFreeShipping",
  switchOffProg = "switchOffProg",
}

const Page = () => {
  const loyaltyProgSettings: LoyaltyProgSettings = {
    greedy: true,
    cumulateUntil: 100,
    useFreeShipping: true,
    switchOffProg: false,
  };

  const handleChange = (key: keyof LoyaltyProgSettings, value: boolean) => {
    // Update the setting for the given key (this can be hooked to state or API later)
    console.log(`Updating ${key} to ${value}`);
  };
  const handleNumberChange = (
    key: keyof LoyaltyProgSettings,
    value: number
  ) => {
    // Update the setting for the given key (this can be hooked to state or API later)
    console.log(`Updating ${key} to ${value}`);
  };

  return (
    <div className="mx-auto max-w-[1200px] flex flex-col justify-center items-center p-5 gap-5">
      <h2 className="text-3xl font-bold w-[50%] text-center my-5">
        Modyfikuj sposób działania twojego programu lojalnościowego
      </h2>
      {Object.values(BooleanOptions)
        .slice(0, Object.values(BooleanOptions).length - 1)
        .map((key) => (
          <RowForBooleanOption
            key={key}
            label={key}
            sublabel={`Description for ${key}`}
            value={
              loyaltyProgSettings[key as keyof LoyaltyProgSettings] as boolean
            }
            onChange={(arg) =>
              handleChange(key as keyof LoyaltyProgSettings, arg)
            }
          />
        ))}
      <RowForNumberOptions
        label="Punkty do skumulowania"
        sublabel="Ilość punktów, po której klient dostaje nagrodę"
        value={loyaltyProgSettings.cumulateUntil}
        onChange={(arg) => handleNumberChange("cumulateUntil", arg)}
      />
      {Object.values(BooleanOptions)
        .slice(Object.values(BooleanOptions).length - 1)
        .map((key) => (
          <RowForBooleanOption
            key={key}
            label={key}
            sublabel={`Description for ${key}`}
            value={
              loyaltyProgSettings[key as keyof LoyaltyProgSettings] as boolean
            }
            onChange={(arg) =>
              handleChange(key as keyof LoyaltyProgSettings, arg)
            }
          />
        ))}
    </div>
  );
};

export default Page;

interface RowForBooleanOptionProps {
  label: string;
  sublabel: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

const RowForBooleanOption = ({
  label,
  sublabel,
  value,
  onChange,
}: RowForBooleanOptionProps) => {
  return (
    <div className="w-full flex p-5 h-36">
      <div className="flex flex-col text-left justify-center">
        <h2 className="text-lg font-semibold">{label}</h2>
        <p className="text-sm text-gray-500">{sublabel}</p>
      </div>
      <div className="flex flex-col ml-auto  justify-center text-center  w-36">
        <p className="mb-4">{value ? "Włączone" : "Wyłączone"}</p>
        <div className="flex gap-3 ">
          <Button onClick={() => onChange(true)}>Włącz</Button>
          <Button onClick={() => onChange(false)}>Wyłącz</Button>
        </div>
      </div>
    </div>
  );
};

type RowForNumberOptionsProps = {
  label: string;
  sublabel: string;
  value: number;
  onChange: (value: number) => void;
};

const RowForNumberOptions = ({
  label,
  sublabel,
  value,
  onChange,
}: RowForNumberOptionsProps) => {
  const [inputValue, setInputValue] = useState(value);

  const handleSave = () => {
    onChange(inputValue); // Save the input value to the parent component
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
