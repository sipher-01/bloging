/* eslint-disable react/no-unknown-property */
import Image1 from "../assets/image1";
import Image2 from "../assets/Image2";
import { auth, provider } from "../firebase/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
// import { useNavigate } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const Signin = ({ setIsAuth }) => {
  console.log(auth);

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <div className="bg-white relative lg:py-20 h-[calc(100vh_-_70px)] ">
        <div
          className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl
      xl:px-5 lg:flex-row"
        >
          <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 lg:pt-20 lg:flex-row">
            <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
              <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
                <img
                  src="https://res.cloudinary.com/macxenon/image/upload/v1631570592/Run_-_Health_qcghbu.png"
                  className="btn-"
                />
              </div>
            </div>
            <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
              <div
                className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl
            relative z-10"
              >
                <p className="w-full text-4xl font-medium text-center leading-snug font-serif">
                  Sign up for an account
                </p>
                <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                  <div className="relative">
                    <p
                      className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                  absolute"
                    >
                      Username
                    </p>
                    <input
                      placeholder="John"
                      type="text"
                      className="border placeholder-gray-400 focus:outline-none
                  focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="relative">
                    <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                      Email
                    </p>
                    <input
                      placeholder="123@ex.com"
                      type="text"
                      className="border placeholder-gray-400 focus:outline-none
                  focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="relative">
                    <p
                      className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                  absolute"
                    >
                      Password
                    </p>
                    <input
                      placeholder="Password"
                      type="password"
                      className="border placeholder-gray-400 focus:outline-none
                  focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"
                    />
                    <div className=" mx-auto w-fit my-4">
                      --------------OR---------------
                    </div>
                    <div className="w-full mt-4">
                      <button
                        className="w-full p-3 border-2 border-blue-600 rounded-lg "
                        onClick={signInWithGoogle}
                      >
                        <div className="flex items-center justify-center space-x-3">
                          <FcGoogle />
                          <span>Sign in with Google</span>
                        </div>
                      </button>
                    </div>
                  </div>
                  <div className="relative">
                    <a
                      className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500
                  rounded-lg transition duration-200 hover:bg-indigo-600 ease"
                    >
                      Submit
                    </a>
                  </div>
                </div>
              </div>
              <Image1 />
              <Image2 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
