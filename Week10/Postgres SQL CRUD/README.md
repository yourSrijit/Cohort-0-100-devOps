# Postgres Db connection
---
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
````