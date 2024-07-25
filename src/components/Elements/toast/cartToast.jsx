
import { Toast, ToastToggle } from 'flowbite-react'
import { FaCartPlus } from 'react-icons/fa'
export const ToastCart = props => {
  const { total } = props
  

  return (
    <div className="fixed top-20 right-5">
      <Toast className="flex flex-wrap">
        <div className=" inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
          <a href="/productscart">
          <FaCartPlus className="h-5 w-5" />

          </a>
        </div>
        <div className="ml-3 text-sm font-normal px-5">{total}</div>
        <ToastToggle />
      </Toast>
    </div>
  )
}
