
import Button from "../Button/index.jsx";

export const StatusPayment = (props)=>{
    const { status, onClick = () => {} } = props
     if (status === 'Pending') {

        return(
    <Button
          classname="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
          onClick={onClick}
        >
          checkput
        </Button>)
     }

     else if(status === 'Succes'){

     }



}