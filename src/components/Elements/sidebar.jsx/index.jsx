import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="h-screen border-r  border-gray-200 w-64 px-9 space-y-24">
      <div className="flex flex-row items-center pt-8">
        
        <div>Welcome Admin</div>
      </div>
      <div className="space-y-24">
        <div>
          <div className="mb-4 text-indigo-700">Menu</div>
          <ul className="space-y-7">
            <li className="flex flex-row items-center text-blue-400">
              <div>
                <Link to="/admin">home</Link>
              </div>
            </li>
            <li className="flex flex-row items-center text-gray-400">
              <div>
                <Link to="/admin/brand">Brand</Link>
              </div>
            </li>
            <li className="flex flex-row items-center text-gray-400">
              {' '}
              <div>
                <Link to="/admin/history">History</Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
export default Sidebar
