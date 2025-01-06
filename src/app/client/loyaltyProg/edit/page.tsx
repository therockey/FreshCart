"use client";
import { getLoyaltyProg, updateLoyaltyProg } from "@/api/CustomerFetch";
import { useQuery, useMutation } from "@tanstack/react-query";
import { RowForBooleanOption } from "@/components/loyaltyProg/RowForBooleanOption";
import { RowForNumberOptions } from "@/components/loyaltyProg/RowForNumberOption";
import {
  LoyaltyProgramSettingsKey,
  LoyaltyProgramSettingsType,
} from "@/service";

const Page = () => {
  const { data: loyaltyProgSettings, refetch } = useQuery({
    queryKey: ["loyaltyProgSettings"],
    queryFn: getLoyaltyProg("1"),
  });
  const mutationFn = async (body: LoyaltyProgramSettingsType) => {
    const data = await updateLoyaltyProg("1", body)();
    return data;
  };
  const { mutate } = useMutation({
    mutationFn: mutationFn,
    onSuccess: () => {
      refetch();
    },
  });

  const handleChange = async (
    key: LoyaltyProgramSettingsKey,
    value: boolean
  ) => {
    mutate({ ...loyaltyProgSettings!, [key]: value });
  };

  const handleNumberChange = async (
    key: LoyaltyProgramSettingsKey,
    value: number
  ) => {
    mutate({ ...loyaltyProgSettings!, [key]: value });
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
        value={loyaltyProgSettings.is_greedy ?? false}
        onChange={(arg) => handleChange("is_greedy", arg)}
      />

      <RowForNumberOptions
        label="Punkty do skumulowania"
        sublabel="Ilość punktów, po której klient dostaje nagrodę"
        value={loyaltyProgSettings.point_threshold ?? 0}
        onChange={(arg) => handleNumberChange("point_threshold", arg)}
      />

      <RowForBooleanOption
        label={"useFreeDelivery"}
        sublabel={"Description for useFreeDelivery"}
        value={loyaltyProgSettings.free_delivery ?? false}
        onChange={(arg) => handleChange("free_delivery", arg)}
      />

      <RowForBooleanOption
        label={"switchOffProg"}
        sublabel={"Description for switchOffProg"}
        value={loyaltyProgSettings.is_active ?? false}
        onChange={(arg) => handleChange("is_active", arg)}
      />
    </div>
  );
};

export default Page;
