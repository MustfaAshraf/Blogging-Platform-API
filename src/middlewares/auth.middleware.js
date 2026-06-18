import { verifyToken } from '../utils/jwt.utils.js';
import User from '../models/User.js';

export const protectRoute = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ error: 'Not authorized, no token provided' });
        }

        const decoded = verifyToken(token);
        const currentUser = await User.findById(decoded.id).select('-password');
        
        if (!currentUser) {
            return res.status(401).json({ error: 'The user belonging to this token no longer exists.' });
        }

        req.user = currentUser;
        next();

    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};