/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase-config.js";
import { signOut } from "firebase/auth";


const Navbar = ({ setIsAuth, isAuth }) => {
  const logOut = () => {
    signOut(auth).then(() => {
      setIsAuth(false);
      localStorage.clear();
    });
  };

  
  return (
    <nav className="bg-white shadow dark:bg-gray-800 sticky top-0 z-[78907689]">
      <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
        <Link
          to="/"
          className="text-gray-800 dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6"
        >
          home
        </Link>

        <Link
          to="/feature"
          className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
        >
          features
        </Link>
        <Link
              to="/blog"
              className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
            >
              blog
            </Link>

        {!isAuth ? (
          <Link
            to="/signin"
            className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
          >
            {" "}
            Sign in{" "}
          </Link>
        ) : (
          <>
         
            <button onClick={logOut}> Log out</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
