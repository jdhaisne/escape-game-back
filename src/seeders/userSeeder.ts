import { Users } from "../models/EMUser"
import { logger } from "../services/ESLogger"

export const seedUSer = async () => {

    const userData = [
        { 
            "firstname" : "admin",
            "lastname" : "admin",
            "email" : "admin@admin.com",
            "password" : "@dmin42",
            "birthday" : "01/01/2000"
        },
        { 
            "firstname" : "john",
            "lastname" : "doe",
            "email" : "valid_email@email.com",
            "password" : "Pass@word42",
            "birthday" : "09/07/1998"
        }
    ]

    try {
        for (let user of userData) {
            const existingUser = await  Users.findOne({email: user.email})

            if (!existingUser) {
                const newUser = new Users(user);
                await newUser.save();
                logger.debug(`User created: ${JSON.stringify(newUser)}`);
              }
        }
        logger.debug(`Seed of Users done.`);
    } catch (error) {
        logger.debug(`Error while seeding Users. ${error}`);
    }
}