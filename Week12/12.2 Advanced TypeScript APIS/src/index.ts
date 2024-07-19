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

//1 Pick ✅
// Pick allows you to create a new type by selecting a set of properties (Keys) from an existing type (Type).
// Imagine you have a User model with several properties, but for a user profile display, you only need a subset of these properties.

type UpdateProps=Pick<User,'age'| 'name'>    //as this is the subset of User

const display=(user:UpdateProps)=>{
    console.log(user.age);
    
}

// 2.Partial
// Makes all properties of a type optional, creating a type with the same properties, but each marked as optional.
type UpdatePropsOptional=Partial<UpdateProps>
const display1=(user:UpdatePropsOptional)=>{
    }
    display1({
        name:"Srijit"
    })

//  3. Readonly 
// When you have a configuration object that should not be altered after initialization, making it Readonly ensures its properties cannot be changed.
const readOnly: Readonly<User>={
    name:'Srijit',
    age:22
}   
// readOnly.age=20   can not assign again as this is readOnly