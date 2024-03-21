import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function insertUser(password: string, fName: string, lName: string,email :string) {
  const res = await prisma.user.create({
    data: {
        password,
        fName,
        lName,
        email
    },
    // by default all the attributes store in teh res or you can add using select 
    select:{
        id:true,       //it will store in res
        password:true //it will store in res
    }
  })
  console.log(res);
}

insertUser( "1234", "Srijit", "bera","berasrijit02@gamil.com");
insertUser( "958", "Kamalika", "bera","kamalika456@gamil.com");
insertUser( "456", "Bishtu", "Saha","bishtu26@gamil.com");