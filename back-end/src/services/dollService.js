import prisma from '../config/database.js';

export const dollService = {
    async getAll(userId) {
        return await prisma.doll.findMany({
            where: { userId },
            orderBy: [{ priority: 'asc' }, { createdAt: 'desc' }],
        });
    },

    async getById(dollId, userId) {
        const doll = await prisma.doll.findFirst({
            where: { id: dollId, userId },
        });

        if (!doll) {
            throw new Error('Boneca não encontrada');
        }

        return doll;
    },

    async create(data, userId) {
        return await prisma.doll.create({
            data: {
                ...data,
                userId,
            },
        });
    },

    async update(dollId, data, userId) {
        const doll = await prisma.doll.findFirst({
            where: { id: dollId, userId },
        });

        if (!doll) {
            throw new Error('Boneca não encontrada');
        }

        return await prisma.doll.update({
            where: { id: dollId },
            data,
        });
    },

    async delete(dollId, userId) {
        const doll = await prisma.doll.findFirst({
            where: { id: dollId, userId },
        });

        if (!doll) {
            throw new Error('Boneca não encontrada');
        }

        await prisma.doll.delete({
            where: { id: dollId },
        });
    },

    async getStats(userId) {
        const dolls = await prisma.doll.findMany({
            where: { userId },
        });

        const total = dolls.reduce((sum, doll) => sum + doll.price, 0);
        const acquired = dolls.filter(d => d.acquired).reduce((sum, doll) => sum + doll.price, 0);
        const percentage = total > 0 ? (acquired / total) * 100 : 0;

        return {
            totalDolls: dolls.length,
            acquiredDolls: dolls.filter(d => d.acquired).length,
            totalValue: total,
            acquiredValue: acquired,
            remainingValue: total - acquired,
            percentage: percentage.toFixed(2),
        };
    },
};
