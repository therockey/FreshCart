import { Minus, Plus, Trash } from "@mynaui/icons-react";
import { Button } from "../ui/button";

interface CartListItemProps {
  name: string;
  price: number;
  quantity: number;
}
const CartListItem = ({ name, price, quantity }: CartListItemProps) => {
  return (
    <div className="flex justify-center  text-center w-full items-center px-[1rem] h-20 ">
      <h2 className="text-xl mr-[3rem]">{name}</h2>
      <div className="flex ">
        <p>{price * quantity} zł</p>
      </div>
      <div className="ml-auto flex h-full items-center align-middle gap-5">
        <p className="mr-5">Sztuki: {quantity}</p>
        <div className="flex flex-col gap-5">
          <Button variant="ghost" size="icon" className=" size-5">
            <Plus />
          </Button>
          <Button variant="ghost" size="icon" className=" size-5">
            <Minus />
          </Button>
        </div>
        <Button variant="ghost" size="icon" className=" size-10">
          <Trash />
        </Button>
      </div>
    </div>
  );
};

export default CartListItem;
