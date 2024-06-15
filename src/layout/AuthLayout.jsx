import { Outlet } from "react-router-dom"
const AuthLayout = () => {
  return (
    <>
        <main className="container mx-auto place-content-center p-5 md:p-0 items-center h-screen">
          <Outlet />
        </main>
       
    </>
  )
}

export default AuthLayout