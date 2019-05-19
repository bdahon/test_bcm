import config from '../config.js';
import { generateToken } from '../utils/token';

export default class UserController {
    
    static getToken(req, res){
        const login = req.body.login;
        const password = req.body.password;

        if (login === config.rootLogin && password === config.rootPassword){
            let token = generateToken({login, password});
            res.json({ token });
        } else {
            res.status(400).json({message: 'authentification fail' });
        }
    }
}