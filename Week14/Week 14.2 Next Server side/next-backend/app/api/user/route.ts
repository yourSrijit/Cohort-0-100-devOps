import client from "../../../db"
import { NextRequest } from "next/server";


export async function GET(){
    //databse logic
    const data=await client.user.findFirst({})
    return Response.json({
        data
    })
}

 
export async function POST(req:NextRequest){
    //extract the username,password from the body
    const body=await req.json();

    await client.user.create({
        data:{
            username:body.username,
            password:body.password,
            confirmPassword:body.confirmPassword
        }
    })
    
    //store the data into database
    return Response.json({
        message:"You are logged in successfully"
    })
}

// export async function POST(){
//     await client.user.deleteMany({});
//     return Response.json({message:"Deleted all"})
// }
