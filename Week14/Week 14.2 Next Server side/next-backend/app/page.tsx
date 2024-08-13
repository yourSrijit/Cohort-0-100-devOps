import axios from "axios";

async function getUserDetails() {
  await new Promise((r)=> setTimeout(r,5000));
  const response = await axios.get("https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details")
	return response.data;
}

export default async function Home() {
  const userDetails=await getUserDetails(); // you can use async await only in server component
  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="card card-side bg-base-100 shadow-xl">
    <figure className="hover:scale-105 overflow-hidden">
      <img
        src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
        alt="Movie" />
    </figure>
  <div className="card-body">
    <h2 className="card-title">{userDetails.name}</h2>
    <p>{userDetails.email}</p>
    
  </div>
</div>

    </div>
  );
}
