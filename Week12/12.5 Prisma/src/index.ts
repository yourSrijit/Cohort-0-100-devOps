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

        // await prisma.user.deleteMany({});
        console.log("Data insertion successful: ", res); 

    const display=await prisma.user.findMany({})
    console.log(display);
    
}

const createTodo=async(title:string ,description:string,user_id:number)=>{
    const res=await prisma.todo.create({
        data: {
            title,
            description,
            user_id
        }
    })
    console.log("Todo insertion successfully");
}

const getTodo=async( user_id:number)=>{
    const res=await prisma.todo.findMany({
        where:{
            user_id
        }
    })
}


insertData("yourSrijit", "Srijit123", "Srijit", "Bera"); 

// createTodo("Gym","I have to go for gyme",1);
