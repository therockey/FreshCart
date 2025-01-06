"use client";
import { ErrorView } from "@/components/commons/ErrorView";
import { Loader } from "@/components/commons/Loader";
import { RowForBooleanOption } from "@/components/loyaltyProg/RowForBooleanOption";
import { RowForNumberOptions } from "@/components/loyaltyProg/RowForNumberOption";
import { useLoyaltyEditPage } from "@/hooks/app/client/loyaltyProg/edit/useLoyaltyProgEditPage";

const Page = () => {
  const {
    loyaltyProgSettings,
    handleChange,
    handleNumberChange,
    error,
    isFetching,
  } = useLoyaltyEditPage(1);
  if (isFetching) return <Loader />;
  if (error || !loyaltyProgSettings) return <ErrorView />;
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
