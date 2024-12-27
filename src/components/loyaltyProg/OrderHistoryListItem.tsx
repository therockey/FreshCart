import { DotsVertical, InfoCircle } from "@mynaui/icons-react";
import { Button } from "../ui/button";
interface LoyaltyProgStats {
  totalPoints: number;
  currentPoints: number;
  savedMoney: number;
}
interface OrderHistoryListItemProps {
  id: string;
  price: number;
  date: Date;
}
const OrderHistoryListItem = ({
  id,
  price,
  date,
}: OrderHistoryListItemProps) => {
  return (
    <div className=" flex justify-center  text-center w-full items-center px-[1rem] h-20 gap-5 ">
      <h2 className="text-xl mr-[3rem]">Zamówienie {id}</h2>
      <p className="text-xl mr-[3rem]">{price} zł</p>
      <p className="text-xl mr-[3rem]">{date.toDateString()}</p>
      <Button variant="ghost" size="icon" className="text-4xl  ml-auto">
        <InfoCircle />
      </Button>
    </div>
  );
};

export default OrderHistoryListItem;
