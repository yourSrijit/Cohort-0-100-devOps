import { PrismaClient } from "@prisma/client";
let prisma=new PrismaClient();

const showData=async(email :string)=>{
 let res=await prisma.user.findMany({
    where:{email}
 })
 console.log(res);
};
const showAll=async()=>{
    let res=await prisma.user.findMany();
    console.log(res);
}


showData("berasrijit02@gamil.com");
showAll();