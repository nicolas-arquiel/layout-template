import React from 'react'
import { Outlet } from 'react-router-dom'

/**
 * Layout para páginas de autenticación (login, registro, etc.)
 * Layout simple sin sidebar ni navbar, centrado en la pantalla
 *
 * @returns {JSX.Element}
 */
const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-950">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
