import { authService } from '../services/authService.js';

export const authController = {
    async register(req, res, next) {
        try {
            const { email, password, name } = req.body;

            if (!email || !password || !name) {
                return res.status(400).json({ error: 'Dados incompletos' });
            }

            const result = await authService.register(email, password, name);
            return res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    },

    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: 'Dados incompletos' });
            }

            const result = await authService.login(email, password);
            return res.json(result);
        } catch (error) {
            if (error.message === 'Credenciais inválidas') {
                return res.status(401).json({ error: error.message });
            }
            next(error);
        }
    },

    async getProfile(req, res, next) {
        try {
            const user = await authService.getProfile(req.userId);
            return res.json(user);
        } catch (error) {
            next(error);
        }
    },

    async loginWithGoogle(req, res, next) {
        try {
            const { googleToken, code, accessToken } = req.body;

            if (!googleToken && !code && !accessToken) {
                return res.status(400).json({ error: 'Token ou código Google é obrigatório' });
            }

            const credentials = googleToken 
                ? { googleToken } 
                : code 
                    ? { code } 
                    : { accessToken };
            const result = await authService.loginWithGoogle(credentials);
            return res.json(result);
        } catch (error) {
            if (error.message.includes('Token') || error.message.includes('código')) {
                return res.status(401).json({ error: error.message });
            }
            next(error);
        }
    },
};
