import { Button } from "../ui/button";

interface RowForBooleanOptionProps {
  label: string;
  sublabel: string;
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}
export const RowForBooleanOption = ({
  label,
  sublabel,
  value,
  onChange,
  disabled,
}: RowForBooleanOptionProps) => {
  return (
    <div className="w-full flex p-5 h-36">
      <div className="flex flex-col text-left justify-center">
        <h2 className="text-lg font-semibold">{label}</h2>
        <p className="text-sm text-gray-500">{sublabel}</p>
      </div>
      <div className="flex flex-col ml-auto  justify-center text-center  w-36">
        {disabled ? (
          <p className="text-sm text-gray-500">
            Program lojalnościowy jest wyłączony
          </p>
        ) : (
          <>
            {" "}
            <p className="mb-4">{value ? "Włączone" : "Wyłączone"}</p>
            <div className="flex gap-3 ">
              <Button onClick={() => onChange(true)}>Włącz</Button>
              <Button onClick={() => onChange(false)}>Wyłącz</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
