import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import {getCookie} from 'hono/cookie'
import { createBlogInput, updateBlogInput } from '@yoursrijit/medium-common';

const blogRouter = new Hono<{
	Bindings:{
		DATABASE_URL:string,
		JWT_SECRET :string
	},
	Variables:{
		userId:string;
	}
}>();

// Adding Middleware
blogRouter.use('/*',async(c,next)=>{
	//get the header
	//verify the header
	//if the header is correct then need to proceed
	//if not we return the user a 403 status code
// const header= c.req.header("Authorization") || "";
// 	console.log(header)
	try{
			const header=getCookie(c,"jwtToken");
			//@ts-ignore
			const token=header.split(" ")[1];

		const response=await verify(token,c.env.JWT_SECRET)
				if(response){
					//@ts-ignore
					c.set("userId",response.id);
					await next();
				}
				else{
					c.status(403);
					return c.json({message :"User is not authorized"})
				}
	}catch(error){
		c.status(403);
		return c.json({message :"You need to login first"})
	}

})


//Create a new blog
blogRouter.post('/', async(c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())

	const body=await c.req.json();
	const {success} =createBlogInput.safeParse(body);
	if(!success){
		c.status(411);
		return c.json({message:"Inputs are not correct"})
	}
	const authorId=c.get("userId");
	try{
		const blog=await prisma.post.create({
			data:{
			   title:body.title,
			   content:body.content,
			   authorId
			}
		})

		if(blog){
			return c.json({id: blog.id,message:"Blog created successfully"})
		}

	}catch(error){
		return c.json({message:"Something went wrong in creating blog"})
	} 
})


//Update the blog
blogRouter.put('/', async(c) => {

	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())

	const body=await c.req.json();
	const {success} =updateBlogInput.safeParse(body);
	if(!success){
		c.status(411);
		return c.json({message:"Inputs are not correct"});
	}
	const authorId=c.get("userId");
	try{
		const blog=await prisma.post.update({
			where:{
				id:body.id,
				authorId
			},
			data:{
			   title:body.title,
			   content:body.content,
			}
		})

		if(blog){
			return c.json({id: blog.id,message:"Blog updated successfully"})
		}

	}catch(error){
		return c.json({message:"Some error occured in updating blog"})
	} 
})
//Routes for get all the posts  || Pagination
blogRouter.get('/all', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
		}).$extends(withAccelerate());

	try {
		const blogs = await prisma.post.findMany({});
		if (blogs.length === 0) {
		c.status(404);
		return c.json({ error: "No posts yet" });
		}
		return c.json({ blogs });
	} catch (error) {
		c.status(500);
		return c.json({ error: "Error fetching posts" });
	}
	});


// Get the blog post of a user
blogRouter.get('/:id', async(c) => {

	const id =c.req.param('id')
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())

	 try{
		const blog=await prisma.post.findUnique({
		where:{
			id
		}
	 })
	 if(!blog){
		c.status(403);
		return c.json({error:"No post yet"})
	 }
	 return c.json({blog})
	}
	 catch(error){
		c.status(405);
		c.json({error:"Error while fetching blogs"})
	 }

})




export default blogRouter;