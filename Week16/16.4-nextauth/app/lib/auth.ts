import CredentialsProvider  from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const NEXT_AUTH={
    providers:[
        CredentialsProvider({
            name:"Email",
            credentials:{
                username:{label:'email',type:'text',placeholder:'Email'},
                password:{lable:"password",type:'password',placeholder:'Password'},
            },
            async authorize(credentials:any){
                return {
                    id:"user1",
                    name:"Srijit",
                    description:"Full Stack Dev",
                    "email":"berasrijit02@gmail.com"
                };
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
          }), 
        GitHubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || ""
          })
    ],
    secret:process.env.NEXTAUTH_SECRET,
    callbacks:{
        jwt:({token,user}:any)=>{
            token.userId=token.sub
            console.log(token);
            return token;
        },
        session:({session,token,user}:any)=>{
            console.log(session);
            
            if(session && session.user){
                session.user.id=token.userId
            }
            return session
        }
    }
}