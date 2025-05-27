'use client';

import { Button } from '@/components/ui/button';
import {
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
import { cn } from '@/lib/utils';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { DiscountType } from '@/components/data-table/types';
import { ProductFormValues } from './types';

interface VariantFormProps {
    index: number;
    form: UseFormReturn<ProductFormValues>;
    removeVariant: () => void;
    discounts: DiscountType[];
}

export function VariantForm({
    index,
    form,
    removeVariant,
    discounts,
}: VariantFormProps) {
    const {
        fields: attributeFields,
        append: appendAttribute,
        remove: removeAttribute,
    } = useFieldArray({
        name: `variants.${index}.attributes`,
        control: form.control,
    });

    return (
        <FormItem className="mb-4 border-2 border-border rounded-md p-4">
            <div className="flex flex-row justify-between items-start">
                <div className="flex flex-col gap-2">
                    <FormLabel>
                        Variant
                    </FormLabel>
                    <FormDescription className='mb-2'>
                        Add variant details for this product.
                    </FormDescription>
                </div>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={removeVariant}
                    className="mt-2"
                >
                    ✖
                </Button>
            </div>
            <div className="space-y-2">
                <div className="flex items-center gap-6">
                    <FormLabel className="w-20">SKU:</FormLabel>
                    <FormField
                        control={form.control}
                        name={`variants.${index}.sku`}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Variant SKU"
                                        className="w-64"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex items-center gap-6">
                    <FormLabel className="w-20">Price:</FormLabel>
                    <FormField
                        control={form.control}
                        name={`variants.${index}.price`}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Variant price"
                                        className="w-64"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex items-center gap-6">
                    <FormLabel className="w-20">In Stock:</FormLabel>
                    <FormField
                        control={form.control}
                        name={`variants.${index}.inStock`}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type="number"
                                        step="1"
                                        placeholder="Variant in stock"
                                        className="w-64"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex items-center gap-6">
                    <FormLabel className="w-20">Discount ID:</FormLabel>
                    <FormField
                        control={form.control}
                        name={`variants.${index}.discountId`}
                        render={({ field }) => (
                            <FormItem>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue="null"
                                >
                                    <FormControl className="w-full">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a discount" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="null">
                                            Без скидки
                                        </SelectItem>
                                        {discounts.map((discount) => (
                                            <SelectItem
                                                key={discount.id}
                                                value={discount.id}
                                            >
                                                {discount.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="mt-4">
                    <div className="flex flex-row gap-15 mb-2">
                        <div className="flex flex-col gap-2 mb-2">
                            <FormLabel>Attributes</FormLabel>
                            <FormDescription>
                                Add attributes for this variant.
                            </FormDescription>
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                appendAttribute({ name: '', value: '' })
                            }
                        >
                            Add Attribute
                        </Button>
                    </div>
                    {attributeFields.map((attrField, attrIndex) => (
                        <div
                            key={attrField.id}
                            className="flex items-center gap-2 mb-2"
                        >
                            <FormField
                                control={form.control}
                                name={`variants.${index}.attributes.${attrIndex}.name`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="Attribute name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`variants.${index}.attributes.${attrIndex}.value`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="Attribute value"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeAttribute(attrIndex)}
                            >
                                ✖
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </FormItem>
    );
}