import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/database.js';
import { googleAuthService } from './googleAuthService.js';

export const authService = {
    async register(email, password, name) {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
            },
        });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        return { user, token };
    },

    async login(email, password) {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new Error('Credenciais inválidas');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Credenciais inválidas');
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
            token,
        };
    },

    async getProfile(userId) {
        return await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
            },
        });
    },

    async loginWithGoogle(credentials) {
        let googleUser;
        
        if (credentials.accessToken) {
            googleUser = await googleAuthService.getUserInfoFromAccessToken(credentials.accessToken);
        } else if (credentials.code) {
            googleUser = await googleAuthService.exchangeCodeForToken(credentials.code);
        } else if (credentials.googleToken) {
            googleUser = await googleAuthService.validateGoogleToken(credentials.googleToken);
        } else {
            throw new Error('Credenciais Google inválidas');
        }

        let user = await prisma.user.findUnique({
            where: { email: googleUser.email },
        });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    email: googleUser.email,
                    name: googleUser.name,
                    googleId: googleUser.googleId,
                    password: null,
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    createdAt: true,
                },
            });
        } else {
            if (!user.googleId) {
                await prisma.user.update({
                    where: { id: user.id },
                    data: { googleId: googleUser.googleId },
                });
            }
            user = {
                id: user.id,
                email: user.email,
                name: user.name,
                createdAt: user.createdAt,
            };
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        return { user, token };
    },
};