interface PaymentMethodButtonProps {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  selected: boolean;
}
export const PaymentMethodButton: React.FC<PaymentMethodButtonProps> = ({
  label,
  onClick,
  selected,
  icon,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        flex justify-center items-center p-4 cursor-pointer w-[40%] border-8
        ${selected ? "bg-primary text-white" : "bg-white text-black"}`}
    >
      <div className="flex justify-center items-center">{icon}</div>
      <p>{label}</p>
    </div>
  );
};
