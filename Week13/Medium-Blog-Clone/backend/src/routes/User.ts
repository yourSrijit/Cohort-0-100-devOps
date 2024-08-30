import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign,verify } from 'hono/jwt'
import {setCookie,getCookie,deleteCookie} from 'hono/cookie'

 const userRouter = new Hono<{
	Bindings:{
		DATABASE_URL:string,
		JWT_SECRET :string
	}
}>();


userRouter.post('/signup', async(c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())

	const body=await c.req.json();
try{
	const res=await prisma.user.findUnique({
		where:{
			email:body.email
		}
	});
	if(res){
		c.status(403)
		 return c.json({error:"User already exists"})
	}
	const userDetail=await prisma.user.create({
		data:{
			email:body.email,
			password:body.password,
			name:body?.name
		}
	})
		
	const token=await sign({id: userDetail.id},c.env.JWT_SECRET);
	setCookie(c,"jwtToken",`Bearer ${token}`);
	return c.json({message:"User created successfully"})
	}
	catch(error){
		c.status(500);
		return c.json({message:"Something went wrong in signup route"});
	}
	
})


userRouter.post('/signin',async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())
	const body=await c.req.json();

	const user=await prisma.user.findUnique({
		where:{
			email:body.email,
			password:body.password
		}
	});
	if(!user){ 
		c.status(403);
		return c.json({message:"User not exists"})
	}
	const token=await sign({id:user.id},c.env.JWT_SECRET)
	setCookie(c,"jwtToken",`Bearer ${token}`);
	return c.json({jwt:token,message:"Welcome sir again"})
})

userRouter.post("/logout",async (c)=>{
	const header=getCookie(c,"jwtToken") || "Bearer fvev";
	const token=header.split(" ")[1];
	try{
		const response=await verify(token,c.env.JWT_SECRET)
		if(!response){
			c.status(403);
			return c.json({message:"User is not authorized"})
		}
		else{
			deleteCookie(c,"jwtToken");
			c.status(200);
			return c.json({message:"User is logged out"})
		}
	}catch(error){
		c.status(403);
		return c.json({message:"User is not authorized"})
	}

})
userRouter.get('/get',async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())
	

	const user=await prisma.user.findMany({})
	return c.json(user)
})

userRouter.post('/delete',async (c) => {
	
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())
	// return c.json("Hi Srijit")
	const user=await prisma.user.deleteMany()
	
	return c.json("user")
})


export default userRouter