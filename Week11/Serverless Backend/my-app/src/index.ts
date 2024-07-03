export interface Env {

}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext):Promise<Response>{
		// return new Response('Hello World Srijit!');   //npm run dev
		console.log(request.body);
		console.log(request.headers);
		console.log(request.method);
		
		
		if(request.method=="GET"){
			return Response.json({
				message:"You sent a GET request"
			})
		}
		else{
			return Response.json({
				message:"You did't send a GET request"
			});
		}
		
	},
};
