import React from "react";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowRight, Image } from "@mynaui/icons-react";
import { CustomFormField } from "@/components/commons/CustomFormField";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Form,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductCategory } from "@/service/Stock";

export const ProductDataInput: React.FC<any> = ({
  sendNext,
  formState: { errors },
  ...rest
}) => {
  const handleData = (data: any) => {
    if (!data.price || data.price <= 0) {
      return;
    }

    if (!data.weight || data.weight <= 0) {
      return;
    }

    if (!data.description) {
      return;
    }

    if (!data.category) {
      return;
    }

    sendNext();
  };

  return (
    <Form {...rest}>
      <form
        onSubmit={rest.handleSubmit(handleData)}
        className="flex flex-col content-center justify-center gap-3"
      >
        <DialogHeader>
          <DialogTitle>Dane</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col justify-center space-y-4">
          <div className="flex flex-row space-x-2.5 justify-between">
            <div className="flex flex-row space-x-2.5">
              <CustomFormField
                label="Cena"
                errorMessage={errors.price?.message && "Cena nie może być <= 0"}
                inputProps={{
                  ...rest.register("price", {
                    required: "Cena nie może być <= 0",
                  }),
                  type: "number",
                  step: "0.01",
                  min: "0",
                }}
              />
              <div className="h-fit pt-7">zł</div>
            </div>
            <div className="flex flex-row space-x-2.5">
              <CustomFormField
                label="Waga"
                errorMessage={
                  errors.weight?.message && "Waga nie może być <= 0"
                }
                inputProps={{
                  ...rest.register("weight", {
                    required: "Waga nie może być <= 0",
                  }),
                  type: "number",
                  min: "0",
                }}
              />
              <div className="h-fit pt-7">g</div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <CustomFormField
              label="Opis"
              errorMessage={
                errors.description?.message && "Opis nie może być pusty"
              }
              inputProps={rest.register("description", {
                required: "Opis nie może być pusty",
              })}
            />
          </div>
          <FormField
            control={rest.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  required
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Proszę wybrać kategorię" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(ProductCategory).map(
                      (category: ProductCategory) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="bg-muted hover:bg-accent">
            <Image />
            Przekaż zdjęcie
          </Button>
          <div className="flex flex-row justify-between">
            <DialogClose asChild>
              <Button className="bg-secondary hover:bg-accent w-48">
                Anuluj
              </Button>
            </DialogClose>
            <Button type="submit" className="w-48 hover:bg-accent">
              Dodaj produkt
              <ArrowRight />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
