'use client';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { DatePickerWithRange } from '../data-range-picker';
import { DiscountFormValues, discountFormSchema } from './types';

const defaultValues: Partial<DiscountFormValues> = {
    name: '',
    percentage: 0,
    date: { from: new Date(), to: new Date() },
    products: [],
    variants: [],
};

export function DiscountForm() {
    const form = useForm<DiscountFormValues>({
        resolver: zodResolver(discountFormSchema),
        defaultValues,
        mode: 'onChange',
    });

    function onSubmit(data: DiscountFormValues) {
        toast('You submitted the following values:', {
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(data, null, 2)}
                    </code>
                </pre>
            ),
        });
    }

    return (
        <div className="hidden space-y-6 p-10 pb-16 md:block">
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <div className="flex-1 lg:max-w-2xl">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Название</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Название скидки"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Введите название скидки
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="percentage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Размер</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Размер скидки"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Введите размер скидки
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Размер</FormLabel>
                                        <FormControl>
                                            <DatePickerWithRange
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Введите размер скидки
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Создать скидку</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}
