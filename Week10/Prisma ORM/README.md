# ORM AND PRISMA

### 1. Boring official defination
`ORM` stands for Object-Relational Mapping, a programming technique used in software development to convert data between incompatible type systems in object-oriented programming languages. This technique creates a "virtual object database" that can be used from within the programming language.
ORMs are used to abstract the complexities of the underlying database into simpler, more easily managed objects within the code
### 2. Easier to digest defination
`ORMs` let you easily interact with your database without worrying too much about the underlying syntax (SQL language for eg)

## Why ORM ?
1.  Simpler syntax (converts objects to SQL queries under the hood)
<img width="1000" alt="Screenshot_2024-02-03_at_5 46 30_PM" src="https://github.com/yourSrijit/Cohort-0-100-devOps/assets/91645620/a106abe7-18d2-4059-bc4a-7f225a44f5ca">

2.Abstraction that lets you flip the database you are using. Unified API irrespective of the DB
<img width="1000" alt="Screenshot_2024-02-03_at_6 01 27_PM" src="https://github.com/yourSrijit/Cohort-0-100-devOps/assets/91645620/8aaab629-953d-445f-b13c-1cb48c5041c3">

3.ype safety/Auto completion
 <img width="1000" alt="Screenshot_2024-02-03_at_6 12 36_PM" src="https://github.com/yourSrijit/Cohort-0-100-devOps/assets/91645620/2477084e-ebd2-40ef-b797-4b879e25a1bf">

4.Automatic migrations
In case of a simple Postgres app, it’s very hard to keep track of all the commands that were ran that led to the current schema of the table.

## What is Prisma 
<img width="1000" alt="Screenshot_2024-02-03_at_6 20 14_PM" src="https://github.com/yourSrijit/Cohort-0-100-devOps/assets/91645620/a4a7390a-7441-4f09-9181-f53f89128a4c">

1. Data model
In a single file, define your schema. What it looks like, what tables you have, what field each table has, how are rows related to each other.
2. Automated migrations
Prisma generates and runs database migrations based on changes to the Prisma schema. 
3. Type Safety
Prisma generates a type-safe database client based on the Prisma schema.

## How to Install Prisma in to a Fresh App

1.Add Dependencis

```
npm install prisma typescript ts-node @types/node --save-dev
```
2.Intilize Typescript
```
npx tsc --init
Change `rootDit` to `src`
Change `outDir` to `dist`
```
3.Initialize a fresh prisma project
```
npx prisma init
```
4.Prisma lets you chose between a few databases (MySQL, Postgres, Mongo)
You can update prisma/schema.prisma  to setup what database you want to use.
5.Create Data Model inside `schema.prisma` file
 like this 
 ```
 model User {
  id         Int      @id @default(autoincrement())
  username   String   @unique
  password   String
  firstName  String
  lastName   String
}
```
5.Generate Migrations file
You have created a single schema file. You haven’t yet run the `CREATE TABLE` commands.To run those and create migration files,run 
```
npx prisma migrate dev --name <User-Define-SchemaName>
```
6. If you have psql localy , try to explore the tables that prisma  created for you.
```
psql -h localhost -d postgres -U postgres
```

7. Create Auto Generated Client
In Prisma, the auto-generative client refers to the client library that is automatically generated based on your Prisma schema and database schema. When you define your data model using Prisma schema, Prisma generates a client library tailored to your data model.

This client library provides a set of functions and types that you can use to interact with your database. It abstracts away the low-level details of database communication, allowing you to focus on working with your data in a more intuitive and type-safe way.
```
npx prisma generate
```
8. Creating App Insert Data
```
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function insertUser(username: string, password: string, firstName: string, lastName: string) {
  const res = await prisma.user.create({
    data: {
        username,
        password,
        firstName,
        lastName
    }
  })
  console.log(res);
}

insertUser("admin1", "123456", "srijit", "Bera")
```
9.Update Data
```
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UpdateParams {
    firstName: string;
    lastName: string;
}

async function updateUser(username: string, {
    firstName,
    lastName
}: UpdateParams) {
  const res = await prisma.user.update({
    where: { username },
    data: {
      firstName,
      lastName
    }
  });
  console.log(res);
}

updateUser("admin1", {
    firstName: "new name",
    lastName: "singh"
})
```
10.Delete Data
```
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
```
