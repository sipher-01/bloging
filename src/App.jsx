import {BrowserRouter, Route,Routes} from "react-router-dom"
import {Suspense, useState} from "react"
import Home from "./pages/Home"
import Layout from "./pages/Layout"
import Feature from "./pages/Feature"
import Blog from "./pages/Blog"
import Error from "./pages/Error"
import Signin from "./pages/Signin"

// const Feature = lazy(()=>{import("./pages/Feature")});
// const Blog = lazy(()=>{import("./pages/Blog")});
// const Error = lazy(()=>{import("./pages/Error")});
// const Signin = lazy(()=>{import("./pages/Signin")});

function App() {
// eslint-disable-next-line no-unused-vars
const [isAuth,setIsAuth]=useState(false)
  return (
  
    <BrowserRouter>
    <Suspense fallback={<div>loading...</div>} >
    <Routes>
      <Route path="/" element={<Layout setIsAuth={setIsAuth} isAuth={isAuth}/>}>
      <Route index element={<Home/>}/>
      <Route path="feature" element={<Feature/>}/>
      <Route path="blog" element={<Blog/>}/>
      <Route path="signin" element={<Signin setIsAuth={setIsAuth} />}/>
      </Route>
      <Route path="*" element={<Error/>}/>
    </Routes>
    </Suspense>
    </BrowserRouter>
  )
}

export default App
