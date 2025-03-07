import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type RouterHandler = (req: Request, res: Response) => Promise<Response>;

// add include:{}

export const getAllDiscouts: RouterHandler = async (req, res) => {  
    try {
        const {active} = req.query;
        const now = new Date();

        const discounts = await prisma.discount.findMany({
            where: active 
            ?{
                startDate: { lte: now },
                endDate: { gte: now },
            }
            : undefined,      
        });

        return res.status(200).json(discounts);
    } catch (error) {
        return res.status(500).json({message: 'Ошибка при получении скидок', error});
    }
};

export const getDiscountById: RouterHandler = async (req, res) =>{
    try {
        const { id } = req.params;
        const discount = await prisma.discount.findUnique({
            where: { id },
        })
        if(discount){
            return res.status(200).json(discount);
        } else {
            return res.status(404).json({ message: 'Скидка не найдена' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Ошибка при получении скидки', error });
    }
};

export const createDiscount: RouterHandler = async (req, res) =>{
    try {
        const {name, percentage, startDate, endDate, products, variants } = req.body;

        const newDiscount = await prisma.discount.create({
            data: {
                name,
                percentage,
                startDate: startDate ? new Date(startDate) : undefined,
                endDate: endDate ? new Date(endDate) : undefined,
            },
        });

        return res.status(201).json(newDiscount);
    } catch (error) {
        return res.status(500).json({ message: 'Ошибка при создании скидки', error });
    }
};



export const updateDiscount: RouterHandler = async (req, res) =>{
    try {
        const id = req.params.id;
        const { name, percentage, startDate, endDate, products, variants } = req.body;

        const existingDiscount = await prisma.discount.findUnique({ where: { id } });
        if (!existingDiscount) {
            return res.status(404).json({ message: 'Скидка не найдена' });
        }

        const updatedDiscount = await prisma.discount.update({
            where: { id },
            data: {
                name,
                percentage,
                startDate: startDate !== undefined ? new Date(startDate) : existingDiscount.startDate,
                endDate: endDate !== undefined ? new Date(endDate) : existingDiscount.endDate,
            },
        });

        return res.status(200).json(updatedDiscount);
    } catch (error) {
        return res.status(500).json({ message: 'Ошибка при обновлении скидки', error });
    }
    
};

export const deleteDiscount: RouterHandler = async (req, res) => {  
    try {
        const { id } = req.params;

        const existingDiscount = await prisma.discount.findUnique( { where: { id }, } );
        if(!existingDiscount){
            return res.status(404).json({ message: 'Скидка не найдена' });
        }

        const deletedDiscount = await prisma.discount.delete( { where: { id }, } );

        return res.status(200).json({ message: 'Скидка удалена', deletedDiscount });
    } catch (error) {
        return res.status(500).json({ message: 'Ошибка при удалении скидки', error });
    }
};














