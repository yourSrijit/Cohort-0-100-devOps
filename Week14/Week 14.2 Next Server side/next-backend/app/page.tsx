import client from "../db"

async function getUserDetails() {
  await new Promise((r)=> setTimeout(r,1000));
  const data=await client.user.findFirst({})
  return data;
}

export default async function Home() {
  const userDetails=await getUserDetails(); // you can use async await only in server component.
      
  return (
    <div className="flex min-h-screen justify-center items-center flex-col">
      <div className="card card-side bg-base-100 shadow-xl">
        <figure className="hover:scale-105 overflow-hidden">
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
            alt="Movie" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{userDetails?.username}</h2>
          <p>{userDetails?.password}</p>
          
        </div>
    </div>
    <a href="/signup"><button className="btn ">Signup</button></a>
    </div>
  );
}
