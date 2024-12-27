import {getOrder} from "@/api/getOrder";
import {useQuery} from "@tanstack/react-query";

const MainContent = () => {
    const {isPending, error, data} = useQuery({
        queryKey: ["order"],
        queryFn: () => getOrder("1231"),
    });

    return (
        <div>
            <h1>Cart</h1>
            {data &&
                data.products.map((product, index) => (
                    <div>
                        <h2>{product.name}</h2>
                        <p>Price: {product.price}</p>
                        <p>Quantity: {data.quantities[index]}</p>
                    </div>
                ))}
        </div>
    );
};

export default MainContent;
