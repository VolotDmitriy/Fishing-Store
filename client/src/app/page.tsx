'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();
    const handleClick = () => {
        router.push(`/auth-admin`);
    };

    return (
        <div className="flex h-screen items-center justify-center bg-violet-500">
            <h1>Home</h1>
            <Button onClick={handleClick}>Click</Button>
        </div>
    );
}
