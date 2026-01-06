import { dollService } from '../services/dollService.js';

export const dollController = {
    async getAll(req, res, next) {
        try {
            const dolls = await dollService.getAll(req.userId);
            return res.json(dolls);
        } catch (error) {
            next(error);
        }
    },

    async getById(req, res, next) {
        try {
            const doll = await dollService.getById(parseInt(req.params.id), req.userId);
            return res.json(doll);
        } catch (error) {
            if (error.message === 'Boneca não encontrada') {
                return res.status(404).json({ error: error.message });
            }
            next(error);
        }
    },

    async create(req, res, next) {
        try {
            const doll = await dollService.create(req.body, req.userId);
            return res.status(201).json(doll);
        } catch (error) {
            next(error);
        }
    },

    async update(req, res, next) {
        try {
            const doll = await dollService.update(parseInt(req.params.id), req.body, req.userId);
            return res.json(doll);
        } catch (error) {
            if (error.message === 'Boneca não encontrada') {
                return res.status(404).json({ error: error.message });
            }
            next(error);
        }
    },

    async delete(req, res, next) {
        try {
            await dollService.delete(parseInt(req.params.id), req.userId);
            return res.status(204).send();
        } catch (error) {
            if (error.message === 'Boneca não encontrada') {
                return res.status(404).json({ error: error.message });
            }
            next(error);
        }
    },

    async getStats(req, res, next) {
        try {
            const stats = await dollService.getStats(req.userId);
            return res.json(stats);
        } catch (error) {
            next(error);
        }
    },
};