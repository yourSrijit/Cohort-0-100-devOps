# NextAuth in Next

Dont forget to add ..env before start this project
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=Your_Password

GOOGLE_CLIENT_ID=8713********6dgootc3m.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOC****scdgsaZ


GITHUB_ID=Iv23ct***NzG
GITHUB_SECRET=4632881c7c3c2122569611****caraf
```

### How to get params data in Next /app/api/auth/[...nextauth]/route.ts
```
import { NextRequest, NextResponse } from "next/server"

export function GET(req: NextRequest, { params }: { params: { nextauth: string[] } }) {
    console.log(params.nextauth[0])
    return NextResponse.json({
        message: "Handler"
    })
}
```
### NextAuth Authentication in Next.js

NextAuth.js is a complete authentication solution for Next.js applications. It provides a way to handle user authentication with various providers like Google, GitHub, Facebook, custom email/password, and more. Here's a comprehensive guide on how to set up and use NextAuth with examples, including how to utilize callbacks such as `jwt`, `session`, `signIn()`, and `signOut()`.

#### Installation

First, install NextAuth.js using npm or yarn:

```bash
npm install next-auth
# or
yarn add next-auth
```

#### Basic Setup

1. **Create API Route for NextAuth**

   In Next.js, API routes are used for server-side logic. Create a file under `pages/api/auth/[...nextauth].js`:

   ```javascript
   import NextAuth from 'next-auth';
   import Providers from 'next-auth/providers';

   export default NextAuth({
     providers: [
       Providers.Credentials({
         name: 'Credentials',
         credentials: {
           username: { label: 'Username', type: 'text' },
           password: { label: 'Password', type: 'password' },
         },
         async authorize(credentials) {
           // Here, you can add logic to verify credentials against your database.
           const user = { id: 1, name: 'John Doe', email: 'john@example.com' };
           
           if (user) {
             return user;
           } else {
             return null;
           }
         },
       }),
     ],
     callbacks: {
       async jwt(token, user) {
         // Called when a new token is created
         if (user) {
           token.id = user.id;
         }
         return token;
       },
       async session(session, token) {
         // Called when a session is checked
         session.user.id = token.id;
         return session;
       },
     },
     pages: {
       signIn: '/auth/signin',  // Custom sign-in page
     },
     session: {
       jwt: true,  // Enable JWT sessions
     },
     jwt: {
       secret: 'your-jwt-secret',  // Define a secret for JWT
     },
   });
   ```

2. **Using NextAuth in Your Application**

   Create a sign-in page in `pages/auth/signin.js`:

   ```javascript
   import { signIn } from 'next-auth/react';

   const SignInPage = () => {
     return (
       <div>
         <h1>Sign In</h1>
         <button onClick={() => signIn('credentials', { redirect: false })}>
           Sign in with Credentials
         </button>
       </div>
     );
   };

   export default SignInPage;
   ```

3. **Protecting Pages (Securing Routes)**

   To protect a page and ensure only authenticated users can access it, use the `useSession` hook:

   ```javascript
   import { useSession, signOut } from 'next-auth/react';

   const Dashboard = () => {
     const { data: session } = useSession();

     if (!session) {
       return <p>Access Denied</p>;
     }

     return (
       <div>
         <h1>Dashboard</h1>
         <p>Welcome, {session.user.name}</p>
         <button onClick={() => signOut()}>Sign out</button>
       </div>
     );
   };

   export default Dashboard;
   ```

### Callbacks in NextAuth

Callbacks in NextAuth are powerful hooks that allow you to customize the behavior at various stages of the authentication process.

1. **JWT Callback**

   The JWT callback is called whenever a JSON Web Token is created, updated, or accessed. This is useful for modifying the token or adding additional properties:

   ```javascript
   callbacks: {
     async jwt(token, user, account, profile, isNewUser) {
       if (user) {
         token.id = user.id;
         token.accessToken = account.accessToken;
       }
       return token;
     },
   },
   ```

2. **Session Callback**

   The session callback is called whenever a session is checked. You can use this to include additional information in the session object:

   ```javascript
   callbacks: {
     async session(session, token) {
       session.user.id = token.id;
       session.accessToken = token.accessToken;
       return session;
     },
   },
   ```

3. **SignIn Callback**

   The signIn callback is called when a user attempts to sign in. You can use it to control if a sign-in attempt should be allowed or not:

   ```javascript
   callbacks: {
     async signIn(user, account, profile) {
       // Allow sign in if user meets certain criteria
       if (user.email.endsWith('@example.com')) {
         return true;
       } else {
         return false;
       }
     },
   },
   ```

4. **SignOut Function**

   To log a user out of the application, use the `signOut` function. You can specify whether to redirect after sign-out or handle it programmatically:

   ```javascript
   import { signOut } from 'next-auth/react';

   const SignOutButton = () => {
     return <button onClick={() => signOut({ callbackUrl: '/goodbye' })}>Sign out</button>;
   };

   export default SignOutButton;
   ```

### Key Points

- **Session Handling:** NextAuth uses JWTs to handle sessions by default, but you can also configure it to use database sessions.
- **Providers:** NextAuth supports various providers for authentication, including social logins, email/password, and custom credentials.
- **Security:** Always ensure to set up a strong secret key for JWT and handle user credentials securely.
- **Customization:** You can customize the behavior and appearance of authentication pages, including sign-in, sign-out, and error pages, by defining them in the `pages` object.

With this setup, you should have a good understanding of how to use NextAuth in your Next.js application along with the powerful callbacks to handle authentication logic!