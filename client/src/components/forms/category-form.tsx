'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { categoryFormSchema, CategoryFormValues } from './types';

import categoryData from '@/app/dashboard/categ.json';

// This can come from your database or API.
const defaultValues: Partial<CategoryFormValues> = {
    name: '',
    parentId: '',
};

export function CategoryForm() {
    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(categoryFormSchema),
        defaultValues,
        mode: 'onChange',
    });

    function onSubmit(data: CategoryFormValues) {
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
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Category name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Please enter category name
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="parentId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Parent</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={'null'}
                                        >
                                            <FormControl className="w-full">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category parent" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="null">
                                                    Без родителя
                                                </SelectItem>
                                                {categoryData.map(
                                                    (category) => (
                                                        <SelectItem
                                                            key={category.id}
                                                            value={category.id}
                                                        >
                                                            {category.name}
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Please select a category parent
                                        </FormDescription>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Update profile</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}
