import { useMutation, useQuery } from "@tanstack/react-query";
import { MachineType, useCustomMachine } from "@/hooks/useCustomMachine";
import {
  createProduct,
  getProducts,
  updateProductStock,
} from "@/api/EmployeeFetch";
import { useForm } from "react-hook-form";
import { NewProductDTO, UpdateStockDTO } from "@/service/Stock";

export const useProductsPage = () => {
  const { data: products, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { state: addProductDialogState, ...addProductEventSenders } =
    useCustomMachine(MachineType.ADD_PRODUCT);
  const addProductFormProps = useForm();

  const { state: updateStockDialogState, ...updateStockEventSenders } =
    useCustomMachine(MachineType.UPDATE_STOCK);
  const updateStockFormProps = useForm();

  const { watch: watchCreateFormProps } = addProductFormProps;
  const { watch: watchUpdateStockFormProps } = updateStockFormProps;

  const addMutationFn = async (body: NewProductDTO) => {
    const data = await createProduct(body)();
    return data;
  };

  const updateStockMutationFn = async (body: UpdateStockDTO) => {
    const data = await updateProductStock(body)();
    return data;
  };

  const { mutate: addMutate } = useMutation({
    mutationFn: addMutationFn,
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: updateStockMutate } = useMutation({
    mutationFn: updateStockMutationFn,
  });

  const addProduct = () => {
    addMutate({
      ...watchCreateFormProps(),
      price: parseFloat(watchCreateFormProps().price),
      weight: parseInt(watchCreateFormProps().weight),
    } as NewProductDTO);
  };

  const updateStock = (productId: number) => {
    updateStockMutate({
      quantity: parseInt(watchUpdateStockFormProps().quantity),
      fk_depot_id: parseInt(watchUpdateStockFormProps().depot),
      fk_product_id: productId,
    } as UpdateStockDTO);
  };

  return {
    products,
    addProductDialogState,
    updateStockDialogState,
    addProductEventSenders,
    updateStockEventSenders,
    addProductFormProps,
    updateStockFormProps,
    addProduct,
    updateStock,
  };
};
