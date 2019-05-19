import jwt from 'jsonwebtoken';
import config from '../config'


export function generateToken(user) {
    
    const expiresIn = 60 * 60 * 24;
    
    return jwt.sign( { login : user.login, password : user.password }, config.jwtSecret, { expiresIn });
}