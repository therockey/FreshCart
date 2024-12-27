interface LoyaltyProgStatBadgeProps {
  label: string;
  value: string;
}

const LoyaltyProgStatBadge = ({ label, value }: LoyaltyProgStatBadgeProps) => {
  return (
    <div className="flex flex-col items-center gap-2 mx-auto w-36">
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-lg">{label}</p>
    </div>
  );
};
export default LoyaltyProgStatBadge;
