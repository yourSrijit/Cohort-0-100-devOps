# Type Script Intro
---
- Strongly typed vs loosely typed
The terms strongly typed and loosely typed refer to how programming languages handle types, particularly how strict they are about type conversions and type safety.

- What is typescript?
TypeScript is a programming language developed and maintained by Microsoft. 
It is a strict syntactical superset of JavaScript and adds optional static typing to the language.

<img src="https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2Fd578419f-7327-4580-9ece-2430f946db42%2FScreenshot_2024-01-28_at_1.00.19_AM.png?table=block&id=b04e253c-04bf-459c-a2a1-bcd33d400cdc&cache=v2">

- Where/How does typescript code run?
Typescript code never runs in your browser. Your browser can only understand `javascript`. 
Javascript is the runtime language (the thing that actually runs in your browser/nodejs runtime)
Typescript is something that compiles down to javascript
When typescript is compiled down to javascript, you get `type checking` (similar to C++). If there is an error, the conversion to Javascript fails. 
<img src="https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F9eebffab-c71c-4259-bd0a-d3018f9cbcb6%2FScreenshot_2024-01-28_at_1.06.49_AM.png?table=block&id=c4e38c5b-b88b-420d-8c0b-cae9448be840&cache=v2">

- Typescript compiler
tsc is the official typescript compiler that you can use to convert Typescript code into Javascript
There are many other famous compilers/transpilers for converting Typescript to Javascript. Some famous ones are - 
1. esbuild
2. swc




##  What is the differance between Interface and Type ⭐⭐⭐⭐
  - 1
  - using type you can not implement classes

  - using interface you can implement classess
 -2 
  - interface can be extends
  - type can not extend



## What are types?
  Very similar to interfaces , types let you aggregate data together.
```
type User = {
	firstName: string;
	lastName: string;
	age: number
}
```

```
  1.Union 
type id= string | number;

function printId(id :id){
    console.log(`ID : ${id}`);
}
printId(101);
printId("E05");
```

```
  2. Intersection
  What if you want to create a type that has every property of multiple types/ interfaces
type Employee = {
    name: string;
    startDate: Date;
  };
  
  type Manager = {
    name: string;
    department: string;
  };
  
  type TeamLead = Employee & Manager;
  
  const teamLead: TeamLead = {
    name: "harkirat",
    startDate: new Date(),
    department: "Software developer"
  };
  
```

## Array in TS 
If you want to access arrays in typescript, it’s as simple as adding a [] annotation next to the type

```
Given an array of positive integers as input, return the maximum value in the array.
type ArrayType =number[];
function maxValue(arr: ArrayType) {
    let max = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i]
        }
    }
    return max;
}

console.log(maxValue([1, 2, 3]));

```
```
interface User1 {
	firstName: string;
	lastName: string;
	age: number;
}

function filteredUsers(users: User1[]) {
    return users.filter(x => x.age >= 18);
}

console.log(filteredUsers([{
    firstName: "Srijit",
    lastName: "Bera",
    age: 21
}, {
    firstName: "Raman",
    lastName: "Singh",
    age: 16
}, ]));
```