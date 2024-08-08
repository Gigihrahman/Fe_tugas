import { Link } from 'react-router-dom'
export const CheckStatusAdmin = props => {
  const { status, idPayment } = props

  if (status === 'Pending' || status === 'pending' || status === 'authorize') {
    return (
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span className="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight">
          <span
            aria-hidden
            className="absolute inset-0 bg-orange-200 opacity-50 rounded-full"
          ></span>
          <Link to={`/admin/history/${idPayment}`} className="relative">
            {status}
          </Link>
        </span>
      </td>
    )
  } else if (status === 'Success') {
    return (
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
          <span
            aria-hidden
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <Link to={`/admin/history/${idPayment}`} className="relative">
            {status}
          </Link>
        </span>
      </td>
    )
  } else if (
    status === 'deny' ||
    status === 'cancel' ||
    status === 'expire' ||
    status === 'failure'
  ) {
    return (
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
          <span
            aria-hidden
            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
          ></span>
          <Link to={`/admin/history/${idPayment}`} className="relative">
            {status}
          </Link>
        </span>
      </td>
    )
  } else {
    return (
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span className="relative inline-block px-3 py-1 font-semibold text-gray-500 leading-tight">
          <span
            aria-hidden
            className="absolute inset-0 bg-gray-200 opacity-50 rounded-full"
          ></span>
          <Link to={`/admin/history/${idPayment}`} className="relative">
            {status}
          </Link>
        </span>
      </td>
    )
  }
}
