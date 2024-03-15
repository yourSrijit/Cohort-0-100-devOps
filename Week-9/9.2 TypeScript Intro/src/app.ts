// const x:number =10;
// console.log(x);

// 1. ✅
// Problem 1: Write a function that greets a user given their first name. 
// function greet(firstName: string) {
//     console.log("Hello " + firstName);
// }

// greet("Srijit");

// greet(50) Argument of type 'number' is not assignable to parameter of type 'string'.ts(2345)

// 2. ✅
// Problem 2 - Sum function      [ Type inference ⭐⭐⭐⭐]
// function sum(a:number ,b:number):number {
//     return a+b;
// }
// sum(10,20);

// 3.✅
// Problem 3 - Return true or false based on if a user is 18+

// function isAdult(age :number):boolean{
//     if(age>18){
//         return true;
//     }
//     return false;
// }

// Problem 4 ✅- 
// Create a function that takes another function as input, and runs it after 1 second.

// function fun1(fun: () => void){   //if this return integer () => number
//        setTimeout(()=>{
//         fun();
//        },1000)
// }
// function hello(){
//     console.log('Hi srijit');
// }
// fun1(hello);

// Step 6 - Interfaces 

// interface User{
//     firstName:string,
//     lastName:string,
//     age:number,
//     email?:string  //optional argument
// };
// function isLegal(user:User): boolean{
//     if(user.age >18){
//         return true;
//     }
//     return false;
// }

// isLegal({
//     firstName:"Srijit",
//     lastName:"Bera",
//     age:23
// })

// interface Person {
//     name: string;
//     age: number;
//     greet(phrase: string): void;
// }

// class Employee implements Person {
//     name: string;
//     age: number;

//     constructor(n: string, a: number) {
//         this.name = "Srijit";
//         this.age = 25;
//     }

//     greet(phrase: string) {
//         console.log(`${phrase} ${this.name}`);
//     }
// }