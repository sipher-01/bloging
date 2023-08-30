/* eslint-disable react/prop-types */
import Navbar from "../components/Navbar"
import {Outlet} from "react-router-dom"
const Layout = ({setIsAuth,isAuth}) => {
  return (
    <div>
      <Navbar setIsAuth={setIsAuth} isAuth={isAuth}/>
      <div>
      <Outlet/>
      </div>
    </div>
  )
}

export default Layout