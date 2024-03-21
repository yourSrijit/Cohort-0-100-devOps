import { PrismaClient } from "@prisma/client";
let prisma=new PrismaClient();

let deleteData=async(id :number)=>{
    let res=await prisma.user.delete({
        where:{id}
    })
    console.log(res,"Data is deleted");
}

let deleteAll=async()=>{
    let res=await prisma.user.deleteMany({});
    console.log('All the data is now cleared');
}

// deleteData(4);
deleteAll();