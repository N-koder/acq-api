import logger from "#config/logger.js";
import bcrypt from 'bcrypt';
import {db} from '#config/db.js'
import { eq } from "drizzle-orm";
import {users} from '#models/user.model.js';

export const hashPassword = async(password) =>{
    try{  
        return await bcrypt.hash(password , 10);

    }catch(err){
        logger.error(`Error hashing : ${err}`);
        throw new Error('Error hashing!')
    }
}


export const createUser = async({name , email , password , role = 'user'}) => {
    try{
        const existingUser = db.select().from(users).where(eq(users.email , email)).limit(1);   
        if(existingUser > 0) throw new Error('Already exists');

        const passwordHash = await hashPassword(password);
        const [newUser] = await db.insert(users).values({name , email , password : passwordHash , role}).returning({id : users.id , name : users.name , email : users.email , role : users.role , created_at : users.created_at})

        logger.info(`user : ${name} created successfully with role : ${role}`);
        return newUser;

    }catch(err){
        logger.error(`Error creating user : ${err}`);
        throw err;
    }
}