import { getLoyaltyProgSettings, updateLoyaltyProg } from "@/api/CustomerFetch";
import {
  LoyaltyProgramSettingsKey,
  LoyaltyProgramSettingsType,
} from "@/service/LoyaltyProg/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLoyaltyEditPage = (userId: number) => {
  const {
    data: loyaltyProgSettings,
    refetch,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["loyaltyProgSettings"],
    queryFn: getLoyaltyProgSettings(userId),
  });
  const mutationFn = async (body: LoyaltyProgramSettingsType) => {
    const data = await updateLoyaltyProg(userId, body)();
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

  return {
    loyaltyProgSettings,
    handleNumberChange,
    handleChange,
    error,
    isFetching,
  };
};
