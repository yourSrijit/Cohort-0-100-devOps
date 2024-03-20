import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UpdateParams {
    fName: string;
    lName: string;
}

async function updateUser(email: string, {
    fName,
    lName,
}: UpdateParams) {
  const res = await prisma.user.update({
    where: { email },
    data: {
      fName,
      lName
    }
  });
  console.log(res);
}

updateUser("berasrijit02@gmail.com", {
    fName: "Kamalika",
    lName: "Bera"
})