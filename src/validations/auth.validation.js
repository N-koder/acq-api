import {z} from 'zod';

export const signupSchema = z.object(
    {
        name : z.string().min(3).max(255).trim(),
        email : z.email().max(255).toLowerCase().trim(),
        password : z.string().min(6).max(130),
        role : z.enum(['user' , 'admin']).default('user')
    }
);


export const signinSchema = z.object(
    {
        email : z.email().max(255).toLowerCase().trim(),
        password : z.string().min(6)
    }
);