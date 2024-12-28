"use client";
import { LoyaltyProgSettings } from "../../../../types/LoyaltyProgSettings";
import { getLoyaltyProg, updateLoyaltyProg } from "@/api/CustomerFetch";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RowForBooleanOption } from "@/components/loyaltyProg/RowForBooleanOption";
import { RowForNumberOptions } from "@/components/loyaltyProg/RowForNumberOption";

const Page = () => {
  const queryClient = useQueryClient();
  const { data: loyaltyProgSettings } = useQuery({
    queryKey: ["loyaltyProgSettings"],
    queryFn: getLoyaltyProg("1231"),
  });

  const handleChange = async (
    key: keyof LoyaltyProgSettings,
    value: boolean
  ) => {
    await updateLoyaltyProg("1231", { ...loyaltyProgSettings!, [key]: value });
    queryClient.invalidateQueries({ queryKey: ["loyaltyProgSettings"] });
  };

  const handleNumberChange = async (
    key: keyof LoyaltyProgSettings,
    value: number
  ) => {
    await updateLoyaltyProg("1231", { ...loyaltyProgSettings!, [key]: value });
    queryClient.invalidateQueries({ queryKey: ["loyaltyProgSettings"] });
  };

  if (!loyaltyProgSettings) return null;
  return (
    <div className="mx-auto max-w-[1200px] flex flex-col justify-center items-center p-5 gap-5">
      <h2 className="text-3xl font-bold w-[50%] text-center my-5">
        Modyfikuj sposób działania twojego programu lojalnościowego
      </h2>

      <RowForBooleanOption
        label={"greedy"}
        sublabel={"Description for greedy"}
        value={loyaltyProgSettings.greedy}
        onChange={(arg) => handleChange("greedy", arg)}
      />

      <RowForNumberOptions
        label="Punkty do skumulowania"
        sublabel="Ilość punktów, po której klient dostaje nagrodę"
        value={loyaltyProgSettings.cumulateUntil}
        onChange={(arg) => handleNumberChange("cumulateUntil", arg)}
      />

      <RowForBooleanOption
        label={"useFreeDelivery"}
        sublabel={"Description for useFreeDelivery"}
        value={loyaltyProgSettings.useFreeDelivery}
        onChange={(arg) => handleChange("useFreeDelivery", arg)}
      />

      <RowForBooleanOption
        label={"switchOffProg"}
        sublabel={"Description for switchOffProg"}
        value={loyaltyProgSettings.switchOffProg}
        onChange={(arg) => handleChange("switchOffProg", arg)}
      />
    </div>
  );
};

export default Page;
