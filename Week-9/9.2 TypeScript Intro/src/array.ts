// Step 8 - Arrays in TS
// If you want to access arrays in typescript, it’s as simple as adding a [] annotation next to the type
// Example 1 
// Given an array of positive integers as input, return the maximum value in the array
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