// // Step 7 - Types
// What are types?
// Very similar to interfaces , types let you aggregate data together.
type User = {
	firstName: string;
	lastName: string;
	age: number
}

// 1.Union 
type id= string | number;

function printId(id :id){
    console.log(`ID : ${id}`);
}
printId(101);
printId("E05");

// 2. Intersection
// What if you want to create a type that has every property of multiple types/ interfaces
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
  

  // What is the differance between Interface and Type ⭐⭐⭐⭐