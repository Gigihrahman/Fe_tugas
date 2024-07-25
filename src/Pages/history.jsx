import { History } from "../components/Elements/history/History.jsx";
import { UserOption } from "../components/Elements/user/option.jsx";
import { useLogin } from "../hooks/uselogin.jsx";



export const HistoryPage = ()=>{
const username = useLogin()



    return (
      <div>
       
        <History />
      </div>
    )
}