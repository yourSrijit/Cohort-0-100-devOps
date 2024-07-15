interface User{
    name:string,
    age:number
}
function sumOfAge(user1:User ,use2:User){
    return user1.age+use2.age;
}
const age=sumOfAge({
    name:'Srijit',age:20
},{name:'kamalika',age:30});

console.log(age);
