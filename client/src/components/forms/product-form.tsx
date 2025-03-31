'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';

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
import { productFormSchema, ProductFormValues } from './types';

import categoryData from '@/app/dashboard/categ.json';
import { cn } from '@/lib/utils';
import { Textarea } from '../ui/textarea';

// This can come from your database or API.
const defaultValues: Partial<ProductFormValues> = {
    name: '',
    description: '',
    categoryId: 'null',
    images: [{ value: '' }],
};

export function ProductForm() {
    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productFormSchema),
        defaultValues,
        mode: 'onChange',
    });

    const { fields, append, remove } = useFieldArray({
        name: 'images',
        control: form.control,
    });

    function onSubmit(data: ProductFormValues) {
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
                                                placeholder="Product name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Please enter product name
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Product description"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Please enter product description
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="categoryId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={categoryData[0].id}
                                        >
                                            <FormControl className="w-full">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category for product" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {/* <SelectItem value="null">
                                                    Без родителя
                                                </SelectItem> */}
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
                                            Please select a category for product
                                        </FormDescription>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div>
                                {fields.map((field, index) => (
                                    <FormField
                                        control={form.control}
                                        key={field.id}
                                        name={`images.${index}.value`}
                                        render={({ field }) => (
                                            <FormItem className="mb-4">
                                                <FormLabel
                                                    className={cn(
                                                        index !== 0 &&
                                                            'sr-only',
                                                    )}
                                                >
                                                    URLs images
                                                </FormLabel>
                                                <FormDescription
                                                    className={cn(
                                                        index !== 0 &&
                                                            'sr-only',
                                                        index === 0 && 'mb-2',
                                                    )}
                                                >
                                                    Add links to your website,
                                                    blog, or social media
                                                    profiles.
                                                </FormDescription>
                                                <div className="flex items-center flex-row">
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() =>
                                                            remove(index)
                                                        }
                                                        disabled={
                                                            fields.length === 1
                                                        }
                                                        className="ml-2"
                                                    >
                                                        ✖
                                                    </Button>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="mt-2"
                                    onClick={() => append({ value: '' })}
                                >
                                    Add URL
                                </Button>
                            </div>
                            <Button type="submit">Update profile</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}
