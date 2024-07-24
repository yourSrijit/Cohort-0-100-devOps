import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const insertData = async (username: string, password: string, firstName: string, lastName: string) => {
        const res = await prisma.user.create({
            data: {
                username,
                password,
                firstName,
                lastName
            }
        });
        console.log("Data insertion successful: ", res);

    const display=await prisma.user.findMany({})
    console.log(display);
    
}

insertData("yourSrijit3", "Srijit123", "Srijit", "Bera");
