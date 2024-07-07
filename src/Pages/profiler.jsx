import { useLogin } from "../hooks/uselogin.jsx";
const ProfilePage = ()=>{
    const username = useLogin();
    return (
      <>
        <div className="bg-gray-200">
          <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
              
              
            </div>
          </div>
        </div>
      </>
    )
}
export default Profil;