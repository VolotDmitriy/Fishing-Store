'use client';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import React from 'react';

interface Props {
    className?: string;
}

export const PathBreadcrumb: React.FC<Props> = ({ className }) => {
    const pathname = usePathname();
    const segments = pathname.split('/').filter((segment) => segment !== '');
    console.log(pathname);

    const getHref = (index: number) => {
        return '/' + segments.slice(0, index + 1).join('/');
    };

    return (
        <div className={cn(className)}>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem className="text-xl">
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>

                    {segments.map((segment, index) => (
                        <React.Fragment key={index}>
                            <BreadcrumbSeparator className="[&>svg]:size-5" />
                            <BreadcrumbItem className="text-xl">
                                {segments.length - 1 !== index ? (
                                    <BreadcrumbLink href={getHref(index)}>
                                        {segment.charAt(0).toUpperCase() +
                                            segment.slice(1)}
                                    </BreadcrumbLink>
                                ) : (
                                    <BreadcrumbPage>
                                        {segment.charAt(0).toUpperCase() +
                                            segment.slice(1)}
                                    </BreadcrumbPage>
                                )}
                            </BreadcrumbItem>
                        </React.Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
};
