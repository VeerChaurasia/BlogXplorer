import { Request, Response, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

// Extend the Express Request type properly
interface RequestWithUser extends Request {
    user?: {
        id: number;
    };
}

const SECRET_KEY = process.env.JWT_SECRET || 'default-secret-key';

export const authenticate: RequestHandler = (req: Request, res: Response, next): void => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'No token provided or invalid token format' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as { id: number };
        (req as unknown as RequestWithUser).user = { id: decoded.id };
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token' });
        return;
    }
};