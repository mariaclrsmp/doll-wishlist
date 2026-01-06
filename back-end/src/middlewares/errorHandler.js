export const errorHandler = (err, req, res, next) => {
    console.error('❌ Erro:', err.message);
    if (process.env.NODE_ENV === 'development') {
        console.error('Stack:', err.stack);
    }

    if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
    }

    if (err.code === 'P2002') {
        return res.status(409).json({ error: 'Email já cadastrado' });
    }

    return res.status(500).json({
        error: 'Erro interno do servidor',
        ...(process.env.NODE_ENV === 'development' && { details: err.message })
    });
};
