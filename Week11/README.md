# Serverless Fucntion
```
npm create cloudeflare -- my-app
'Hellow World' workers
typescript yes



npm run dev ->to start the application
```
## Return JSON
```
export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		return Response.json({
			message: "hi"
		});
	},
};
``` 

## Creating Route 
```
export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		console.log(request.body);
		console.log(request.headers);
		
		if (request.method === "GET") {
			return Response.json({
				message: "you sent a get request"
			});
		} else {
			return Response.json({
				message: "you did not send a get request"
			});
		}
	},
};
```

## Deploy and Login Cloudflare wrangler acct
```
npx wrangler login
npx wrangler whoami


npm run deploy

After deploy -> https://my-app.berasrijit51.workers.dev/
```