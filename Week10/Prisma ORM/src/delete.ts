import { PrismaClient } from "@prisma/client";
let prisma=new PrismaClient();

let deleteData=async(id :number)=>{
    let res=await prisma.user.delete({
        where:{id}
    })
    console.log(res,"Data is deleted");
}

deleteData(4);