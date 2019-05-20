import config from '../config';
import jwt from 'jsonwebtoken';
import { RateLimiterMemory }  from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory(
    {
        points: config.rateLimiter.try, 
        duration: config.rateLimiter.duration, // per 10 min
    });

export const isLogin = (req, res) => {
    return new Promise ((resolve) => {
        const token = req.headers['x-access-token'];

        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if (err || decoded.role > 10) { 
                return res.status(403).send({ message: 'invalid token' });
            }
            resolve();
        });
    });
}

export const rateLimiterMiddleware = (req, res) => {
    return new Promise ((resolve) => {
        rateLimiter.consume(req.ip).then(() => {
            resolve();
        }).catch(err => {
            console.log(err),
            res.status(429).json({message: 'too many request'});
        });
    });
}