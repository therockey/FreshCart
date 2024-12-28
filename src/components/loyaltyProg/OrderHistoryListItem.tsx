import { InfoCircle } from "@mynaui/icons-react";
import { Button } from "../ui/button";
import { OrderHistoryItem } from "@/types/OrderHistoryItem";

const OrderHistoryListItem = ({ id, price, date }: OrderHistoryItem) => {
  return (
    <div className=" flex justify-center  text-center w-full items-center px-[1rem] h-20 gap-5 ">
      <h2 className="text-xl mr-[3rem]">Zamówienie {id}</h2>
      <p className="text-xl mr-[3rem]">{price} zł</p>
      <p className="text-xl mr-[3rem]">{date.toString()}</p>
      <Button variant="ghost" size="icon" className="text-4xl  ml-auto">
        <InfoCircle />
      </Button>
    </div>
  );
};

export default OrderHistoryListItem;
