// 'use client';

// import { addDays, format } from 'date-fns';
// import { CalendarIcon } from 'lucide-react';
// import * as React from 'react';
// import { DateRange } from 'react-day-picker';

// import { Button } from '@/components/ui/button';
// import { Calendar } from '@/components/ui/calendar';
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from '@/components/ui/popover';
// import { cn } from '@/lib/utils';

// export function DatePickerWithRange({
//     className,
// }: React.HTMLAttributes<HTMLDivElement>) {
//     const [date, setDate] = React.useState<DateRange | undefined>({
//         from: new Date(2022, 0, 20),
//         to: addDays(new Date(2022, 0, 20), 20),
//     });

//     return (
//         <div className={cn('grid gap-2', className)}>
//             <Popover>
//                 <PopoverTrigger asChild>
//                     <Button
//                         id="date"
//                         variant={'outline'}
//                         className={cn(
//                             'w-[300px] justify-start text-left font-normal',
//                             !date && 'text-muted-foreground',
//                         )}
//                     >
//                         <CalendarIcon />
//                         {date?.from ? (
//                             date.to ? (
//                                 <>
//                                     {format(date.from, 'LLL dd, y')} -{' '}
//                                     {format(date.to, 'LLL dd, y')}
//                                 </>
//                             ) : (
//                                 format(date.from, 'LLL dd, y')
//                             )
//                         ) : (
//                             <span>Pick a date</span>
//                         )}
//                     </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0" align="start">
//                     <Calendar
//                         initialFocus
//                         mode="range"
//                         defaultMonth={date?.from}
//                         selected={date}
//                         onSelect={setDate}
//                         numberOfMonths={2}
//                     />
//                 </PopoverContent>
//             </Popover>
//         </div>
//     );
// }

'use client';

import { addDays, format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface DatePickerWithRangeProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    value?: DateRange;
    onChange?: (value: DateRange | undefined) => void;
}

export function DatePickerWithRange({
    className,
    value,
    onChange,
}: DatePickerWithRangeProps) {
    return (
        <div className={cn('grid gap-2', className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={'outline'}
                        className={cn(
                            'w-[300px] justify-start text-left font-normal',
                            !value && 'text-muted-foreground',
                        )}
                    >
                        <CalendarIcon />
                        {value?.from ? (
                            value.to ? (
                                <>
                                    {format(value.from, 'LLL dd, y')} -{' '}
                                    {format(value.to, 'LLL dd, y')}
                                </>
                            ) : (
                                format(value.from, 'LLL dd, y')
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={value?.from}
                        selected={value}
                        onSelect={onChange}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}