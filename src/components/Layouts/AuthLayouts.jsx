import { Link } from "react-router-dom";

const AuthLayouts =(props) =>{
    const {children,title,type}=props;
    return (
      <div className="flex justify-center min-h-screen items-center bg-gray-200 ">
        <div className="w-full max-w-xs rounded-lg shadow-md p-6 bg-white">
          <h1 className="text-3xl font-bold mb-2 text-blue-600">{title}</h1>
          <p className="font-medium text-slate-500">
            Welcome, please enter your data
          </p>
          {children}
          <Navigation type={type} />
        </div>
      </div>
    )
}

const Navigation = ({type})=>{
  if (type === "login") {
    return(
      <p className="text-sm mt-5 text-center"> 
          Don't have an account? {" "}
          
            <Link to="/register" className="font-bold text-blue-600">Register
            </Link>
            </p>
    )
  }
  else{
    return( <p className="text-sm mt-5 text-center"> 
          Already have an account? {" "}
          
            <Link to="/login" className="font-bold text-blue-600">Login
            </Link>
            </p>)
  }
}

export default AuthLayouts;