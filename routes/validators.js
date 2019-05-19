import jwt from 'jsonwebtoken'
import config from '../config.js'

export function isLogin(req, res) {
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