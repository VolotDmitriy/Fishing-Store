import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { RouterHandler } from '../../utils/controllerUtils';

dotenv.config();

const { ADMIN_LOGIN, ADMIN_PASSWORD, JWT_SECRET, JWT_EXPIRES } = process.env;

export const login: RouterHandler = async (req, res) => {
    const { username, password } = req.body;

    if (username !== ADMIN_LOGIN || password !== ADMIN_PASSWORD) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
    }

    const secret = JWT_SECRET as string;
    const expiresIn = Number(JWT_EXPIRES) || '1d';

    const token = jwt.sign({ role: 'admin' }, secret, { expiresIn });

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: Number(JWT_EXPIRES),
    });

    res.json({ message: 'Login successful' });
};

export const logout: RouterHandler = async (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out' });
};
