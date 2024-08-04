import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'

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
const header= c.req.header("authorization") || "";
const token=header.split(" ")[1];

const response=await verify(header,c.env.JWT_SECRET)
        if(response){
            //@ts-ignore
            c.set("userId",response.id);
            await next();
        }
        else{
            c.status(403);
            return c.json({error :"User is not authorized"})
        }
})


//Create a new blog
blogRouter.post('/', async(c) => {
    const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())

    const body=await c.req.json();
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
            return c.json({id: blog.id})
        }
        
    }catch(error){
        return c.json({error})
    } 
})


//Update the blog
blogRouter.put('/', async(c) => {

    const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())

    const body=await c.req.json();
    try{
        const blog=await prisma.post.update({
            where:{
                id:body.id
            },
            data:{
               title:body.title,
               content:body.content,
            }
        })

        if(blog){
            return c.json({id: blog.id})
        }
        
    }catch(error){
        return c.json({error})
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