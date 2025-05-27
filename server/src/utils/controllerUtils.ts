import { Request, Response } from 'express';

export type RouterHandler = (req: Request, res: Response) => Promise<void>;

export const ErrorHandler = (error: any, res: Response) => {
    const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({
        error: 'Internal Server Error',
        details: errorMessage,
    });
};
