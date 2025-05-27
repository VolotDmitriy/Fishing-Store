'use client';

import { Button } from '@/components/ui/button';

export default function Home() {
    const handleClick = () => {
        console.log('Кнопка была нажата!');
    };

    return (
        <div className="flex h-screen items-center justify-center bg-violet-500">
            <h1>Home</h1>
            <Button onClick={handleClick}>Click</Button>
        </div>
    );
}
