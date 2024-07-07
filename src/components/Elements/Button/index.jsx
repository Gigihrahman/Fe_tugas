
const Button = (props)=>{
  const {classname="bg-gray-500"  , children, onClick=()=>{} , type ="button"} = props;
  return(
    <button className={`h-10 px-5 font-semibold rounded-md ${classname} text-white`} type={type}
    onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button;