import React from 'react'
import { Outlet } from 'react-router-dom'

/**
 * Layout para páginas de autenticación (login, registro, etc.)
 * Se simplifica para delegar el control total del estilo a las páginas hijas (Login, Register, etc.)
 *
 * @returns {JSX.Element}
 */
const AuthLayout = () => {
  return (
    <>
      <Outlet />
    </>
  )
}

export default AuthLayout
