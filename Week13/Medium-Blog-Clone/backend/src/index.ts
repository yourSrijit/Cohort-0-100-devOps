import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'

// Create the main Hono app
const app = new Hono<{
	Bindings:{
		DATABASE_URL:string,
		JWT_SECRET :string
	}
}>();

app.get('/',(C)=>{
  return C.text("Hi Srijit")  
})

// Adding Middleware
app.use('/api/v1/blog/*',async(c,next)=>{
//get the header
//verify the header
//if the header is correct then need to proceed
//if not we return the user a 403 status code
const header= c.req.header("authorization") || "";
const token=header.split(" ")[1];

const response=await verify(header,c.env.JWT_SECRET)
		if(response){
			await next();
		}
		else{
			c.status(403);
			return c.json({error :"User is unauthorized"})
		}
})

app.post('/api/v1/signup', async(c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())

	const body=await c.req.json();
	const res=await prisma.user.findUnique({
		where:{
			email:body.email
		}
	});
	if(res){
		c.status(403)
		 return c.json({error:"User already exists"})
	}
	const user=await prisma.user.create({
		data:{
			email:body.email,
			password:body.password,

		}
	})
	const token=await sign({id: user.id},c.env.JWT_SECRET)
	return c.json({jwt:token})
})



app.post('/api/v1/signin',async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())
	const body=await c.req.json();

	const user=await prisma.user.findUnique({
		where:{
			email:body.email
		}
	});
	if(!user){
		c.status(403);
		return c.json({error :"User not found"})
	}
	const token=await sign({id:user.id},c.env.JWT_SECRET)
	return c.json({jwt:token})
})


app.get('/api/v1/blog/:id', (c) => {
	const id = c.req.param('id')
	console.log(id);
	return c.text('get blog route')
})

app.post('/api/v1/blog', (c) => {

	return c.text('signin route')
})

app.put('/api/v1/blog', (c) => {
	return c.text('signin route')
})

export default app;
