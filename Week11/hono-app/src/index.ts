import { Hono, Next } from 'hono'
import { Context } from 'hono/jsx';

const app = new Hono();
async function authMiddleware(c:any,next:any){
  if (c.req.header("Authorization")) {
    // Do validation
    await next()
  } else {
    return c.text("You dont have acces");
  }
}

app.get('/',authMiddleware, async (c) => {

  // return c.text("Hello World"); 

  const body = await c.req.json()
  console.log(body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("param"));

  return c.json({msg: "Hi Srijit Good Luck"})
})


// app.post('/user',(c)=>{
//   return c.text('Hello World');
// })
export default app