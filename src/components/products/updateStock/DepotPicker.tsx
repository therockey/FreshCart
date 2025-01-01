import React from "react";
import {Button} from "@/components/ui/button";
import {DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {ArrowRight} from "@mynaui/icons-react";
import {useQuery} from "@tanstack/react-query";
import {getDepots} from "@/api/EmployeeFetch";
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    Form,
} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Depot} from "@/types/Depot";

export const DepotPicker: React.FC<any> = ({
                                               sendNext,
                                               sendBack,
                                               ...rest
                                           }) => {

    const {isPending, error, data} = useQuery({
        queryKey: ["depots"],
        queryFn: getDepots,
    });

    const handleDepot = (data: any) => {
        sendNext();
    };

    return (
        <>
            <DialogHeader>
                <DialogTitle>Wybierz magazyn z listy</DialogTitle>
            </DialogHeader>
            <Form {...rest}>
                <form onSubmit={rest.handleSubmit(handleDepot)} className="space-y-6">
                    <FormField
                        control={rest.control}
                        name="depot"
                        render={({field}) => (
                            <FormItem>
                                <Select onValueChange={field.onChange} defaultValue={field.value} required>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Proszę wybrać magazyn"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {data?.map((depot: Depot) => (
                                            <SelectItem key={depot.id} value={depot.id}>
                                                {depot.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">
                        Przejdź dalej
                        <ArrowRight/>
                    </Button>
                </form>
            </Form>
        </>
    );
}