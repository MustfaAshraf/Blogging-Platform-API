export const notFound = (req, res, next) => {
    res.status(404).json({ error: `Endpoint Not Found: ${req.originalUrl}` });
};

export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    res.status(500).json({ 
        error: "Internal Server Error", 
        message: err.message 
    });
};