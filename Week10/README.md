# PostGres SQL & ORM Prisma ✅
--- 
### Data Types and Check Constrains
- SERIAL PRiMARY KEY
- NOT NULL
- UNIQUE
- TEXT
- INTEGER
- BOOLEAN
DATE yyyy-mm-dd


## Create Connetion using Client object

```
import { Client } from 'pg';

export async function getClient() {
    const client = new Client("postgres://bcgohfiu:******************ELzi@kesavan.db.elephantsql.com/bcgohfiu");
    await client.connect();
    return client;
}
```

## Create Table with the Client Object 
` await client.query(createUserTableQuery);` the query method helps to store tha table structure of the table in the DB
```
import { getClient } from "./utils";

async function createTable() {
    const createUserTableQuery = `
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        );
    `;

    const client = await getClient();

    await client.query(createUserTableQuery);

    const createTodosQuery = `
        CREATE TABLE todos (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT,
            user_id INTEGER REFERENCES users(id),
            done BOOLEAN DEFAULT FALSE
        );
        `;


    await client.query(createTodosQuery);

    console.log("Table created successfully!");
}



createTable();
```

## Insert data into Tables
The `query` method helps to so all the db operations
```
import { getClient } from "./utils";

async function createEntries() {
    const client = await getClient();
    const insertUserText = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id';  
    const userValues = ['john.do11e@gmail2.com', 'hashed_password_here'];      //SQL Injection

    let response = await client.query(insertUserText, userValues);
    const insertTodoText = 'INSERT INTO todos (title, description, user_id, done) VALUES ($1, $2, $3, $4) RETURNING id';
    const todoValues = ['Buy groceries', 'Milk, bread, and eggs', response.rows[0].id, false];
    await client.query(insertTodoText, todoValues);

    console.log("Entries created!");
}
createEntries();
```
### SQL Injection
SQL injection is a code injection technique that might destroy your database.
SQL injection is one of the most common web hacking techniques.
SQL injection is the placement of malicious code in SQL statements, via web page input.

#### SQL in Web Pages
SQL injection usually occurs when you ask a user for input, like their username/userid, and instead of a name/id, the user gives you an SQL statement that you will unknowingly run on your database.
![sql-injection](https://github.com/yourSrijit/Cohort-0-100-devOps/assets/91645620/003e01c1-43d7-4a3f-becf-3089ce9419ec)


## Get data by Where Clause
```
import { getClient } from "./utils";

async function getUsers() {
    const client = await getClient();
    
    const selectUsersText = 'SELECT * FROM users';
    const userRes = await client.query(selectUsersText);
    
    console.log("Users:");
    for (let user of userRes.rows) {
        console.log(`ID: ${user.id}, Email: ${user.email}`);
    }
}

async function getUserFromEmail(email: string) {
    const client = await getClient();
    
    const selectUserText = 'SELECT * FROM users WHERE email = $1';
    const userRes = await client.query(selectUserText, [email]);
    
    console.log("Single User detail:");
    for (let user of userRes.rows) {
        console.log(`ID: ${user.id}, Email: ${user.email}`);
    }
}

async function getTodosForUser(userId: number) {
    const client = await getClient();
    
    const selectTodosText = 'SELECT * FROM todos WHERE user_id = $1';
    const todoRes = await client.query(selectTodosText, [userId]);
    
    console.log(`Todos for User ID ${userId}:`);
    for (let todo of todoRes.rows) {
        console.log(`ID: ${todo.id}, Title: ${todo.title}, Description: ${todo.description}, Done: ${todo.done}`);
    }
}

getUsers();

getUserFromEmail("john.do11e@gmail2.com")

const userIdToFetch = 1;
getTodosForUser(userIdToFetch);
```

## Update table [Update keyword]

```
import { getClient } from "./utils";

async function updateTodo(todoId: number) {
    const client = await getClient();
    
    const updateTodoText = 'UPDATE todos SET done = $1 WHERE id = $2';
    await client.query(updateTodoText, [true, todoId]);
    
    console.log(`Todo with ID ${todoId} updated to done!`);
}

const todoIdToUpdate = 1;
updateTodo(todoIdToUpdate);

```

--- 
## JOINS in SQL

- Full Outer Join
- Inner Join
- Left Join
- Right Join
by default `Inner Join` is occure if you not mention any join explicitly

![Visual_SQL_JOINS_orig](https://github.com/yourSrijit/Cohort-0-100-devOps/assets/91645620/e2bf3404-2d0f-4c23-b4fb-39debe084b7c)


Syntax ->
```
import { getClient } from "../utils";

// Get all todos for a give user
// This needs to ensure that every user comes atleast once
async function getUserAndTodosWithJoin(userId: number) {
    const client = await getClient();

    const joinQuery = `
        SELECT users.*, todos.title, todos.description, todos.done
        FROM users
        LEFT JOIN
        todos ON users.id = todos.user_id
        WHERE users.id = $1;
    `;

    const res = await client.query(joinQuery, [userId]);
    
    const results = res.rows;

    console.log("User and Todos:", results);
    console.log("This is res",res);
}

getUserAndTodosWithJoin(1)
```
---

# ORM AND PRISMA
Object Relational Mapping (ORM) is a technique used in creating a "bridge" between object-oriented programs and, in most cases, relational databases. Put another way, you can see the ORM as the layer that connects object oriented programming (OOP) to relational databases.
`ORM's let you easily interact with your database without worrying too much about the underlying syntax (SQL language)`


### 1. Boring official defination
`ORM` stands for Object-Relational Mapping, a programming technique used in software development to convert data between incompatible type systems in object-oriented programming languages. This technique creates a "virtual object database" that can be used from within the programming language.
ORMs are used to abstract the complexities of the underlying database into simpler, more easily managed objects within the code
### 2. Easier to digest defination
`ORMs` let you easily interact with your database without worrying too much about the underlying syntax (SQL language for eg)

## Why ORM ?
1.  Simpler syntax (converts objects to SQL queries under the hood)

2.Abstraction that lets you flip the database you are using. Unified API irrespective of the DB

3.ype safety/Auto completion
 
4.Automatic migrations
In case of a simple Postgres app, it’s very hard to keep track of all the commands that were ran that led to the current schema of the table.

## What is Prisma 
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
6.Generate Migrations file
You have created a single schema file. You haven’t yet run the `CREATE TABLE` commands.To run those and create migration files,run 
```
npx prisma migrate dev --name <User-Define-SchemaName>
```
7. If you have psql localy , try to explore the tables that prisma  created for you.
```
psql -h localhost -d postgres -U postgres
```
8. Create Auto Generated Client
In Prisma, the auto-generative client refers to the client library that is automatically generated based on your Prisma schema and database schema. When you define your data model using Prisma schema, Prisma generates a client library tailored to your data model.

This client library provides a set of functions and types that you can use to interact with your database. It abstracts away the low-level details of database communication, allowing you to focus on working with your data in a more intuitive and type-safe way.

```
npx prisma generate
```

9. Creating App Insert Data
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
10.Update Data
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
11.Delete Data
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


