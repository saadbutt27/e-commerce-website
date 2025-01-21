import { logoutUser } from '@/app/actions'
import { getSession } from '@/lib/serverLib'
import { ChevronDown, Link } from 'lucide-react'
import React, { useEffect } from 'react'

export default function Login_out() {
  let name: string = "Login"
  
  const handleLogout = async () => { 
    await logoutUser()
  }

  useEffect(() => {
    async function sess() {
      const session = await getSession()
      name = session.user.name
    }
  })
  return (
    <>
      {name === 'Login' ? 
        <Link href={'/login'} className="flex flex-col justify-center items-center">
          <button className="flex items-center gap-x-2 bg-gray-100 rounded-lg p-2 relative">
            <p className="text-lg font-semibold">{name}</p>
          </button>
        </Link>
      : 
        <ul className="relative flex space-x-8 sm:space-x-12 text-lg font-medium text-gray-800">
          <li className="group relative cursor-pointer select-none">
            <div className="flex gap-x-1 items-center">
              <p className="text-lg font-semibold">{name}</p>
              <ChevronDown className="w-4 h-4 mt-1" />
            </div>
            <div className="sm:min-w-0 absolute right-0">
              <ul
                className="flex flex-col group-hover:max-h-max group-hover:py-2 max-h-0 w-24 overflow-hidden 
                  duration-500 bg-slate-50 text-xs sm:text-base font-normal rounded-md
                  group-hover:shadow-md px-1 group-hover:border border-transparent group-hover:border-slate-200 cursor-pointer"
              >
                  <li className="p-1 shrink-0 duration-200">
                    <button onClick={handleLogout} type="button">Logout</button>
                  </li>
              </ul>
            </div>
          </li>
        </ul>
      }
    </>
  )
}
