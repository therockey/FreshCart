import React from "react";
import {Button} from "@/components/ui/button";
import {DialogClose, DialogHeader, DialogTitle} from "@/components/ui/dialog";
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
import {Depot} from "@/service";

export const DepotPicker: React.FC<any> = ({
                                               sendNext,
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
                                            <SelectItem key={depot.id} value={depot.id.toString()}>
                                                {depot.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-row justify-between">
                        <DialogClose asChild>
                            <Button className="bg-secondary hover:bg-accent w-48">
                                Anuluj
                            </Button>
                        </DialogClose>
                        <Button type="submit" className="w-48 hover:bg-accent">
                            Przejdź dalej
                            <ArrowRight/>
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
}