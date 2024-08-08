
import Button from "../Button/index.jsx";

export const StatusPayment = props => {
  const { status, onClick = () => {} } = props

 
  if (status === 'Pending' || status === 'pending') {
    return (
      <div>
        <Button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
          onClick={onClick}
        >
          Checkout
        </Button>
      </div>
    )
  }

 
  return null
}