
export const CheckStatus = (props)=>{
    const {status} = props;
    if(status === "Pending"){
        return (
          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <span className="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight">
              <span
                aria-hidden
                className="absolute inset-0 bg-orange-200 opacity-50 rounded-full"
              ></span>
              <span className="relative">Suspended</span>
            </span>
          </td>
        )
    }
    else if(status ==="Success"){
            return(
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                            ></span>
                            <span className="relative">succcs</span>
                          </span>
                        </td>                                              
            )
    }


}