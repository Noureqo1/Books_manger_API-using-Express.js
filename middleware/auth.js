const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || authHeader !== 'Bearer ZEWAIL') {
        return res.status(401).json({ 
            message: 'Unauthorized: Invalid or missing authentication token' 
        });
    }

    next();
};

module.exports = authMiddleware;
