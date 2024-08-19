import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server"

//@ts-ignore
const client=new PrismaClient();

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
