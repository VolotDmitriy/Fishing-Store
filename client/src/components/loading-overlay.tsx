import React from 'react';

interface LoadingOverlayProps {
    isLoading: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
    isLoading,
}) => {
    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-[9999]">
            <div className="w-[50px] h-[50px] border-[5px] border-[#f3f3f3] border-t-[#3498db] rounded-full animate-spin" />
        </div>
    );
};
