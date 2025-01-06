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
        label={"Zachłanne wydawanie punktów"}
        sublabel={"Wydawaj punkty od razu po ich zdobyciu"}
        value={loyaltyProgSettings.is_greedy ?? false}
        onChange={(arg) => handleChange("is_greedy", arg)}
        disabled={!loyaltyProgSettings.is_active}
      />

      <RowForNumberOptions
        label="Kumulowanie Punktów"
        sublabel="Wydawaj punkty dopiero po osiągnięciu określonego progu"
        value={
          loyaltyProgSettings.is_greedy || !loyaltyProgSettings.is_active
            ? 0
            : loyaltyProgSettings.point_threshold ?? 0
        }
        onChange={(arg) => handleNumberChange("point_threshold", arg)}
        disabled={
          (loyaltyProgSettings.is_greedy || !loyaltyProgSettings.is_active) ??
          undefined
        }
        errorMessage={
          loyaltyProgSettings.is_active
            ? "Wydawanie zachłanne włączone"
            : "Program lojalnościowy jest wyłączony"
        }
      />

      <RowForBooleanOption
        label={"Darmowa dostawa"}
        sublabel={"Darmowa dostawa dla klientów z aktywnym programem lojalnościowym przy zakupach powyżej 200 zł"}
        value={loyaltyProgSettings.free_delivery ?? false}
        onChange={(arg) => handleChange("free_delivery", arg)}
        disabled={!loyaltyProgSettings.is_active}
      />

      <RowForBooleanOption
        label={"Włącz program lojalnościowy"}
        sublabel={""}
        value={loyaltyProgSettings.is_active ?? false}
        onChange={(arg) => handleChange("is_active", arg)}
      />
    </div>
  );
};

export default Page;
