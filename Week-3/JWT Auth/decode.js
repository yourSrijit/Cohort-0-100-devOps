let jwt=require("jsonwebtoken");
let psw='secrert';
let data={
    name:'srijit',
    age:21
};
let sign=jwt.sign(data,psw);
//the output of the above code is a token
console.log("The token is= "+sign);


//decode is used for getting the date from the token without usinfg the password(anybody can do this)
let decode=jwt.decode(sign);
console.log(decode);


// verify is used for verifying the token is valid or not
try{
    let validate=jwt.verify(sign,psw);
    console.log(validate);
}
catch{
    console.log('Some error occured');
}