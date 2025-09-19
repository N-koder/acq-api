import logger from '#config/logger.js';
import jwt from 'jsonwebtoken';

const scrt = process.env.JWT_SECRET || 'developemnt-secret-key';
const expire = '1d';

export const jwtToken = { 
    sign : (payload) => {
        try{
            return jwt.sign(payload , scrt , {expiresIn : expire});
        }catch(err){
            logger.error('authenticate token failed!' , err);
            throw new Error('Failed authentication token!');
        }
    },


    verify : (token) => {
        try{
            return jwt.verify(token , scrt);
        }catch(err){
            logger.error('failed to verify token!' , err);
            throw new Error("failed to verify token!");
        }
    }
};
