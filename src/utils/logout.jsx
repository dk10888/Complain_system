import { useNavigate } from "react-router-dom";

export function Logout(){
  console.log("XXXX")
    const navigate=useNavigate();
    const handleout=()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("pages/Login")

}
  return (
    <button  onClick={handleout}  className="bg-red-500 text-white px-4 py-2 rounded  hover:bg-red-700 transition font-semibold">
      Logout
    </button>
  );

}