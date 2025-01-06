import { useMutation, useQuery } from "@tanstack/react-query";
import { MachineType, useCustomMachine } from "@/hooks/useCustomMachine";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProductStock,
} from "@/api/EmployeeFetch";
import { useForm } from "react-hook-form";
import { NewProductDTO } from "@/service/Product/types";
import { UpdateStockDTO } from "@/service/Stock/types";

export const useProductsPage = () => {
  const { data: products, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { state: addProductDialogState, ...addProductEventSenders } =
    useCustomMachine(MachineType.ADD_PRODUCT);
  const addProductFormProps = useForm();

  const { state: removeProductDialogState, ...removeProductEventSenders } =
      useCustomMachine(MachineType.REMOVE_PRODUCT);

  const { state: updateStockDialogState, ...updateStockEventSenders } =
    useCustomMachine(MachineType.UPDATE_STOCK);
  const updateStockFormProps = useForm();

  const { watch: watchCreateFormProps } = addProductFormProps;
  const { watch: watchUpdateStockFormProps } = updateStockFormProps;

  const addMutationFn = async (body: NewProductDTO) => {
    const data = await createProduct(body)();
    return data;
  };

  const removeMutationFn = async (productId: number) => {
    const data = await deleteProduct(productId.toString())();
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

  const { mutate: removeMutate } = useMutation({
    mutationFn: removeMutationFn,
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

  const removeProduct = (productId: number) => {
    removeMutate(productId);
  }

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
    removeProductDialogState,
    updateStockDialogState,
    addProductEventSenders,
    removeProductEventSenders,
    updateStockEventSenders,
    addProductFormProps,
    updateStockFormProps,
    addProduct,
    removeProduct,
    updateStock,
  };
};
